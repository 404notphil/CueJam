import {combineReducers} from 'redux';
import {CounterState, counterReducer} from './counterReducer';

export interface RootState {
  counter: CounterState;
}

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;