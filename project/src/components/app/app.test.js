import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {MAX_MISTAKE_COUNT, AuthorizationStatus, AppRoute} from '../../const';
import App from './app';

const mockStore = configureStore({});
describe('Test routing', () => {
  jest.spyOn(redux, 'useSelector');
  jest.spyOn(redux, 'useDispatch');

  it('Render "WelcomeScreen" when user navigate to / url', () => {
    const history = createMemoryHistory();
    render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <App />
        </Router>
      </redux.Provider>,
    );

    expect(screen.getByText(/Начать игру/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Можно допустить ${MAX_MISTAKE_COUNT}`, 'i'))).toBeInTheDocument();
  });

  it('Render "AuthScreen" when user navigate to /login url', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.LOGIN);

    render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <App />
        </Router>
      </redux.Provider>,
    );

    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  });

  it('Render "WinScreen" when user navigate to /result url', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      GAME: {step: 10, mistakes: 2},
    });

    const history = createMemoryHistory();
    history.push(AppRoute.RESULT);

    render(
      <redux.Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </redux.Provider>,
    );

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно на 8 вопросов/i)).toBeInTheDocument();
    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  });

  it('Render "GameOverScreen" when user navigate to /lose url', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.LOSE);

    render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <App />
        </Router>
      </redux.Provider>,
    );

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки. Ничего, повезёт в следующий раз!/i)).toBeInTheDocument();
  });

  it('Render "NotFoundScreen" when user navigate to /non-existent route', () => {
    const history = createMemoryHistory();
    history.push('/non-existent-route');

    render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <App />
        </Router>
      </redux.Provider>,
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
