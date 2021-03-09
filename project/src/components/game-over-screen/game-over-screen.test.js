import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GameOverScreen from './game-over-screen';
import {AppRoute} from '../../const.js';

const mockStore = configureStore({});

let history;
let store;

describe('Test GameOverScreen', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.LOSE);
    store = mockStore({});
  });

  it('GameOverScreen should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GameOverScreen
            onReplayButtonClick={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
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
            <Route exact path={AppRoute.LOSE}>
              <GameOverScreen
                onReplayButtonClick={replayButtonClickHandle}
              />
            </Route>
            <Route exact path={AppRoute.GAME}><h1>Mock Game Screen</h1></Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Попробовать ещё раз/i));

    expect(replayButtonClickHandle).toBeCalled();
    expect(screen.getByText(/Mock Game Screen/i)).toBeInTheDocument();
  });
});
