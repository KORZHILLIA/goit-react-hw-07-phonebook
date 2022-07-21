import { combineReducers } from 'redux';
import contactsSlice from './contacts/contacts-slice';
import { filterReducer } from './filter/filter-reducer';

const rootReducer = combineReducers({
  // items: itemsReducer,
  // loading: loadingReducer,
  // error: errorReducer,
  contacts: contactsSlice,
  filter: filterReducer,
});

export default rootReducer;
