import {createAction} from '@reduxjs/toolkit';
import {isArtistAnswerCorrect, isGenreAnswerCorrect} from '../game';
import {GameType} from '../const';

export const ActionType = {
  INCREMENT_MISTAKES: 'game/incrementMistake',
  INCREMENT_STEP: 'game/incrementStep',
  RESET_GAME: 'game/reset',
  LOAD_QUESTIONS: 'data/loadQuestions',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'game/redirectToRoute',
};

export const incrementStep = createAction(ActionType.INCREMENT_STEP, () => ({
  payload: 1,
}));

export const resetGame = createAction(ActionType.RESET_GAME);

export const incrementMistake = createAction(ActionType.INCREMENT_MISTAKES, (question, userAnswer) => {
  let answerIsCorrect;

  switch (question.type) {
    case GameType.ARTIST:
      answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
      break;
    default:
      answerIsCorrect = false;
  }

  return {
    type: ActionType.INCREMENT_MISTAKES,
    payload: answerIsCorrect ? 0 : 1,
  };
});

export const loadQuestions = createAction(ActionType.LOAD_QUESTIONS, (questions) => ({
  payload: questions,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const logout = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));
