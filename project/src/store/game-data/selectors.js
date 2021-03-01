import {NameSpace} from '../root-reducer';

export const getQuestions = (state) => state[NameSpace.DATA].questions;
export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;
