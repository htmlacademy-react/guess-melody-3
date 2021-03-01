import {createReducer} from '@reduxjs/toolkit';
import {loadQuestions} from '../action';

const initialState = {
  questions: [],
  isDataLoaded: false,
};

const gameData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuestions, (state, action) => {
      state.isDataLoaded = true;
      state.questions = action.payload;
    });
});

export {gameData};
