import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../store/api-actions';
import {resetGame} from '../../store/action';
import {getStep, getMistakeCount} from '../../store/game-process/selectors';

function WinScreen(props) {
  const {questionsCount, mistakesCount, onReplayButtonClick, onResetGame, logoutGame} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link
          className="result-logout__link"
          onClick={(evt) => {
            evt.preventDefault();

            logoutGame();
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
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        onClick={() => {
          onResetGame();
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
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
  logoutGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionsCount: getStep(state),
  mistakesCount: getMistakeCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onResetGame() {
    dispatch(resetGame());
  },
  logoutGame() {
    dispatch(logout());
  },
});


export {WinScreen};

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);
