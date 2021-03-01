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

export const incrementStep = () => ({
  type: ActionType.INCREMENT_STEP,
  payload: 1,
});

export const resetGame = () => ({
  type: ActionType.RESET_GAME,
});

export const incrementMistake = (question, userAnswer) => {
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
};

export const loadQuestions = (questions) => ({
  type: ActionType.LOAD_QUESTIONS,
  payload: questions,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
