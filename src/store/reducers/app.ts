import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IApp, ITodo} from '../types';
import {Toast} from '@components/Toast';

export const appInitialState: IApp = {};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{time: string; todo: ITodo}>) => {
      const time = action.payload.time;
      const todo = action.payload.todo;
      if (state[time]) {
        state[time].push(todo);
      } else {
        state[time] = [];
        state[time].push(todo);
      }
      state[time] = state[time].sort((a, b) => {
        if (a.time_stam_end && b.time_stam_end) {
          return a.time_stam_end - b.time_stam_end;
        } else {
          return 0;
        }
      });
      Toast.success('Add Success');
      return state;
    },
    removeTodo: (state, action: PayloadAction<{time: string; id: string}>) => {
      const time = action.payload.time;
      const id = action.payload.id;
      const data = state[time];
      const result = data.filter(item => item.id !== id);
      state[time] = result;
      Toast.success('remove Success');
      return state;
    },
    changeStatusTodo: (
      state,
      action: PayloadAction<{time: string; id: string}>,
    ) => {
      const time = action.payload.time;
      const id = action.payload.id;
      let data = state[time];
      const index = data.findIndex(item => item.id === id);
      data[index]!.status = 'Finish';
      state[time] = data;
      Toast.success('Change Success');
      return state;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
