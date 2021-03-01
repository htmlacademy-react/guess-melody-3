import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {incrementStep, incrementMistake} from '../../store/action';
import {AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../mistakes/mistakes';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import {getQuestions} from '../../store/game-data/selectors';
import {getStep, getMistakeCount} from '../../store/game-process/selectors';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

function GameScreen() {
  const step = useSelector((state) => getStep(state));
  const mistakes = useSelector((state) => getMistakeCount(state));
  const questions = useSelector((state) => getQuestions(state));

  const dispatch = useDispatch();

  const onUserAnswer = (currentQuestion, answer) => {
    dispatch(incrementStep());
    dispatch(incrementMistake(currentQuestion, answer));
  };

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

export default GameScreen;
