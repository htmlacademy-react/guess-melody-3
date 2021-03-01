import React from 'react';
import PropTypes from 'prop-types';

function GenreQuestionItem(props) {
  const {answer, id, onChange, renderPlayer, userAnswer} = props;

  return (
    <div className="track">
      {renderPlayer(answer.src, id)}
      <div className="game__answer">
        <input
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={`answer-${id}`}
          id={`answer-${id}`}
          checked={userAnswer}
          onChange={({target}) => {
            const value = target.checked;
            onChange(id, value);
          }}
        />
        <label
          className="game__check"
          htmlFor={`answer-${id}`}
        >
          Отметить
        </label>
      </div>
    </div>
  );
}

GenreQuestionItem.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
};

export default GenreQuestionItem;
