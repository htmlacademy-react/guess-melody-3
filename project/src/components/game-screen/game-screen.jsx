import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import artistQuestionProp from '../artist-question-screen/artist-question.prop';
import genreQuestionProp from '../genre-question-screen/genre-question.prop';
import Mistakes from '../mistakes/mistakes';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

function GameScreen(props) {
  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to={AppRoute.LOSE} />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.RESULT} />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Redirect to={AppRoute.ROOT} />;
  }
}

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired,
  ),
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
