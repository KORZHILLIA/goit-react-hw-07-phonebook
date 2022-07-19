import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

const store = configureStore({
  reducer: {
    contacts: rootReducer,
  },
});

export default store;
