import {ActionType} from './action';
import {FIRST_GAME_STEP, AuthorizationStatus} from '../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP: {
      const nextStep = state.step + action.payload;

      return {
        ...state,
        step: nextStep,
      };
    }
    case ActionType.INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload,
      };
    case ActionType.RESET_GAME:
      return {
        ...state,
        mistakes: 0,
        step: FIRST_GAME_STEP,
      };
    case ActionType.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};


export {reducer};
