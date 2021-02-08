import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {AppRoute, GameType, FIRST_GAME_STEP} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import artistQuestionProp from '../artist-question-screen/artist-question.prop';
import genreQuestionProp from '../genre-question-screen/genre-question.prop';

function GameScreen(props) {
  const [step, setStep] = useState(FIRST_GAME_STEP);

  const {questions} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.ROOT} />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreen
          key={step}
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreen
          key={step}
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    default:
      return <Redirect to={AppRoute.ROOT} />;
  }
}

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.oneOfType([artistQuestionProp, genreQuestionProp]).isRequired,
  ),
};

export default GameScreen;
