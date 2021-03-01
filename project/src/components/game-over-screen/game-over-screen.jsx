import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {resetGame} from '../../store/action';

function GameOverScreen({onReplayButtonClick}) {
  const dispatch = useDispatch();
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button
        onClick={() => {
          dispatch(resetGame());
          onReplayButtonClick();
        }}
        className="replay"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </section>
  );
}

GameOverScreen.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default GameOverScreen;
