import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'; // You will create this next
import { configureStore } from '@reduxjs/toolkit';

// Create store
export const store = configureStore({
    reducer: rootReducer
});
