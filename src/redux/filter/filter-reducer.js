import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './filter-actions';

export const filterReducer = createReducer('', {
  [setFilter]: (store, { payload }) => payload,
});
