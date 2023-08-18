import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import chaReducer from '../slice/chaSlice';
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cha : chaReducer
  },
  middleware: [thunk]
});
