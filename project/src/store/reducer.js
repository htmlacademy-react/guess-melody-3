import {ActionType} from './action';
import {FIRST_GAME_STEP} from '../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + action.payload,
      };
    case ActionType.INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload,
      };
    default:
      return state;
  }
};


export {reducer};
