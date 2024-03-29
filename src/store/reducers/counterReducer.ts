import {createSlice} from '@reduxjs/toolkit';

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action creators
export const increment = () => ({type: INCREMENT});
export const decrement = () => ({type: DECREMENT});

// Initial state
const initialState = {
  count: 0,
};

export interface CounterState {
  count: number;
}

// Reducer
export const counterReducer = (
  state: CounterState = initialState,
  action: {type: string},
) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, count: state.count + 1};
    case DECREMENT:
      return {...state, count: state.count - 1};
    default:
      return state;
  }
};
