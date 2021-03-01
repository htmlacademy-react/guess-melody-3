import {ActionType} from '../action';

const initialState = {
  questions: [],
  isDataLoaded: false,
};

const gameData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export {gameData};
