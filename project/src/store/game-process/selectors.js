import {NameSpace} from '../root-reducer';

export const getStep = (state) => state[NameSpace.GAME].step;
export const getMistakeCount = (state) => state[NameSpace.GAME].mistakes;
