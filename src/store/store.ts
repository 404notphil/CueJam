import {createStore, applyMiddleware, Action} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {configureStore} from '@reduxjs/toolkit';

// Create store
export const store = configureStore({
  reducer: rootReducer,
});

// Define AppThunk for thunks that do not return a value
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
