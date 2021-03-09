import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import WinScreen from './win-screen';
import {AppRoute} from '../../const.js';

const mockStore = configureStore({});
let history;
let store;

describe('Test WinScreen', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.RESULT);
    store = mockStore({
      GAME: {step: 10, mistakes: 2},
    });
  });

  it('WinScreen should be render correctly', () => {
    const correctlyQuestionsCount = 8;
    const mistakes = 2;
    render(
      <Provider store={store}>
        <Router history={history}>
          <WinScreen
            onReplayButtonClick={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(correctlyQuestionsCount);
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(mistakes);
  });

  it('When user click "Replay Button" should be redirect', () => {
    const replayButtonClickHandle = jest.fn();
    replayButtonClickHandle.mockImplementation(
      () => history.push(AppRoute.GAME),
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.RESULT}>
              <WinScreen
                onReplayButtonClick={replayButtonClickHandle}
              />
            </Route>
            <Route exact path={AppRoute.GAME}><h1>Game Screen</h1></Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Сыграть ещё раз/i));
    expect(replayButtonClickHandle).toBeCalled();
    expect(screen.getByText('Game Screen')).toBeInTheDocument();
  });
});
