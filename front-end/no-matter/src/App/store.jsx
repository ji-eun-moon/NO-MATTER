// import { configureStore } from '@reduxjs/toolkit';
// // import languageReducer from '../features/language/languageSlice';
// // import authReducer from '../slice/authSlice';
// import userReducer from '../slice/userSlice';
// import thunk from 'redux-thunk'

// export const store = configureStore({
//   reducer: {
//     // language: languageReducer,
//     // auth: authReducer,
//     user: userReducer
//   },
//   middleware: [thunk]
// });




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
