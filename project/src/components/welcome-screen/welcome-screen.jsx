import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {resetGame} from '../../store/action';
import {AppRoute} from '../../const';

function WelcomeScreen(props) {
  const {errorsCount} = props;

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button
        className="welcome__button"
        onClick={() => {
          dispatch(resetGame());
          history.push(AppRoute.GAME);
        }}
      >
        <span className="visually-hidden">
          Начать игру
        </span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
}

WelcomeScreen.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default WelcomeScreen;
