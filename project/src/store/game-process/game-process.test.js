import {gameProcess} from './game-process';
import {ActionType, incrementStep} from '../action';

describe('Reducers work correctly', () => {
  it('Reducer without additional parameters should return initial state', () => {
    expect(gameProcess(undefined, {}))
      .toEqual({step: 0, mistakes: 0});
  });

  it('Reducer should increment current step by a given value', () => {
    const state = {step: 0, mistakes: 0};

    expect(gameProcess(state, incrementStep()))
      .toEqual({step: 1, mistakes: 0});

    const nonIncrementStepAction = {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    };

    expect(gameProcess(state, nonIncrementStepAction))
      .toEqual({step: 0, mistakes: 0});
  });

  it('Reducer should increment number of mistakes by a given value', () => {
    const state = {step: 0, mistakes: 0};
    const incrementMistakeAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };

    expect(gameProcess(state, incrementMistakeAction))
      .toEqual({step: 0, mistakes: 1});

    const nonIncrementMistakeAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };

    expect(gameProcess(state, nonIncrementMistakeAction))
      .toEqual({step: 0, mistakes: 0});
  });

  it('Reducer should return default', () => {
    const resetGameAction = {
      type: ActionType.RESET_GAME,
      payload: null,
    };

    expect(gameProcess({step: 5, mistakes: 1}, resetGameAction))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess({step: 0, mistakes: 0}, resetGameAction))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess({step: 2, mistakes: 0}, resetGameAction))
      .toEqual({step: 0, mistakes: 0});
  });
});
