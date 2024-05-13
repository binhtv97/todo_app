import {IApp, IInitialState, ITodo} from '../types';

export const getAppState = (state: IInitialState): IApp => state.app;

// export const getData = (state: IInitialState): ITodo[] => getAppState(state);
