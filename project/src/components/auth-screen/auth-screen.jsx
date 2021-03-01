import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../../store/api-actions';
import {AppRoute} from '../../const';

function AuthScreen() {
  const loginRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__text">Хотите узнать свой результат? Представьтесь!</p>
      <form
        className="login__form"
        action=""
        onSubmit={handleSubmit}
      >
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input
            ref={loginRef}
            className="login__input"
            type="text"
            name="name"
            id="name"
          />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input
            ref={passwordRef}
            className="login__input"
            type="text"
            name="password"
            id="password"
          />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <button
        onClick={() => history.push(AppRoute.GAME)}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export default AuthScreen;
