import { combineReducers } from 'redux';
import {
  itemsReducer,
  loadingReducer,
  errorReducer,
} from './contacts/contacts-reducer';
import { filterReducer } from './filter/filter-reducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
  filter: filterReducer,
});

export default rootReducer;
