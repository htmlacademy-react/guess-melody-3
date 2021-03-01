import {createReducer} from '@reduxjs/toolkit';
import {incrementStep, incrementMistake, resetGame} from '../action';
import {FIRST_GAME_STEP} from '../../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const gameProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state, action) => {
      state.step = state.step + action.payload;
    })
    .addCase(incrementMistake, (state, action) => {
      state.mistakes = state.mistakes + action.payload;
    })
    .addCase(resetGame, (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    });
});

export {gameProcess};
