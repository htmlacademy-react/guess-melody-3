import {ActionType} from '../action';
import {FIRST_GAME_STEP} from '../../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const gameProcess = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export {gameProcess};
