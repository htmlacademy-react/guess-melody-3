import {
  incrementStep,
  incrementMistake,
  resetGame,
  ActionType
} from './action';


describe('Action creators work correctly', () => {
  it('Action creator for incrementing step returns correct action', () => {
    const expectedAction = {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };

    expect(incrementStep()).toEqual(expectedAction);
  });

  it('Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct', () => {
    const expectedAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };

    const question = {
      type: 'artist',
      song: {
        artist: 'correct',
        src: '',
      },
      answers: [
        {
          artist: 'correct',
          picture: '',
        },
        {
          artist: 'incorrect',
          picture: '',
        },
        {
          artist: 'incorrect-2',
          picture: '',
        },
      ],
    };

    const useAnswer = {
      artist: 'correct',
      picture: '',
    };

    expect(incrementMistake(question, useAnswer)).toEqual(expectedAction);
  });

  it('Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect', () => {
    const expectedAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };

    const question = {
      type: 'artist',
      song: {
        artist: 'correct',
        src: '',
      },
      answers: [
        {
          artist: 'correct',
          picture: '',
        },
        {
          artist: 'incorrect',
          picture: '',
        },
        {
          artist: 'incorrect-2',
          picture: '',
        },
      ],
    };

    const userAnswer = {
      artist: 'incorrect',
      picture: '',
    };

    expect(incrementMistake(question, userAnswer))
      .toEqual(expectedAction);
  });

  it('Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct', () => {
    const expectedAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };

    const question = {
      type: 'genre',
      genre: 'jazz',
      answers: [
        {
          genre: 'rock',
          src: '',
        },
        {
          genre: 'jazz',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
      ],
    };

    const userAnswer = [false, true, false, false];

    expect(incrementMistake(question, userAnswer)).toEqual(expectedAction);
  });

  it('Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect', () => {
    const expectedAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };

    const question = {
      type: 'genre',
      genre: 'jazz',
      answers: [
        {
          genre: 'blues',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
        {
          genre: 'blues',
          src: '',
        },
      ],
    };

    const userAnswer = [true, true, true, true];

    expect(incrementMistake(question, userAnswer)).toEqual(expectedAction);
  });

  it('Action creator for reset game returns action with undefined payload', () => {
    const expectedAction = {
      type: ActionType.RESET_GAME,
    };

    expect(resetGame()).toEqual(expectedAction);
  });
});
