import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

function GameOverScreen({onReplayButtonClick, resetGame}) {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <button
        onClick={() => {
          resetGame();
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
  resetGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {GameOverScreen};

export default connect(null, mapDispatchToProps)(GameOverScreen);
