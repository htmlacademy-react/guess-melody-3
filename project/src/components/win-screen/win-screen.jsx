import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {resetGame} from '../../store/action';
import {getStep, getMistakeCount} from '../../store/game-process/selectors';

function WinScreen(props) {
  const {onReplayButtonClick} = props;
  const step = useSelector((state) => getStep(state));
  const mistakes = useSelector((state) => getMistakeCount(state));
  const dispatch = useDispatch();
  const correctlyQuestionsCount = step - mistakes;

  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link
          className="result-logout__link"
          onClick={(evt) => {
            evt.preventDefault();

            dispatch(logout());
          }}
          to='/'
        >
          Выход
        </Link>
      </div>
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakes} ошибки</p>
      <button
        onClick={() => {
          dispatch(resetGame());
          onReplayButtonClick();
        }}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

WinScreen.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default WinScreen;
