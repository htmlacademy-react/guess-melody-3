import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import AuthScreen from './auth-screen';
import {AppRoute} from '../../const';

const mockStore = configureStore({});

it('Render "AuthScreen" when user navigate to /login url', () => {
  const history = createMemoryHistory();
  history.push(AppRoute.LOGIN);

  render(
    <redux.Provider store={mockStore({})}>
      <Router history={history}>
        <AuthScreen />
      </Router>
    </redux.Provider>,
  );

  expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId('login'), 'keks');
  userEvent.type(screen.getByTestId('password'), '123456');

  expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});

