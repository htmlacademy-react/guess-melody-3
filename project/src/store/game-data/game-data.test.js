import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {gameData} from './game-data';
import {ActionType} from '../action';
import {fetchQuestionList} from '../api-actions';
import {APIRoute} from '../../const';

const api = createAPI(() => {});
const questions = [
  {
    type: 'genre',
    genre: 'rock',
    answers: [{
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'blues',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'jazz',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
      genre: 'rock',
    }],
  },
  {
    type: 'artist',
    song: {
      artist: 'Jim Beam',
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg',
    },
    answers: [{
      picture: 'https://api.adorable.io/avatars/128/A',
      artist: 'John Snow',
    }, {
      picture: 'https://api.adorable.io/avatars/128/AB',
      artist: 'Jack Daniels',
    }, {
      picture: 'https://api.adorable.io/avatars/128/AC',
      artist: 'Jim Beam',
    }],
  },
];

describe('Reducer "gameData" should work correctly', () => {
  it('Reducer without additional parameters should return initial state', () => {
    expect(gameData(undefined, {}))
      .toEqual({questions: [], isDataLoaded: false});
  });

  it('Reducer should update questions by load questions', () => {
    const state = {questions: [], isDataLoaded: false};
    const loadQuestionsAction = {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };

    expect(gameData(state, loadQuestionsAction))
      .toEqual({questions, isDataLoaded: true});
  });

});

describe('Async operation work correctly', () => {
  it('Should make a correct API call to /questions', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = fetchQuestionList();

    apiMock
      .onGet(APIRoute.QUESTIONS)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});

