import { createSlice } from '@reduxjs/toolkit';
import * as contactsOperations from './contacts-operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [contactsOperations.getAllContacts.pending]: store => ({
      ...store,
      loading: true,
      error: null,
    }),
    [contactsOperations.getAllContacts.fulfilled]: (store, { payload }) => {
      store.items = payload;
      store.loading = false;
    },
    [contactsOperations.getAllContacts.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),
    [contactsOperations.deleteContact.pending]: store => ({
      ...store,
      loading: true,
      error: null,
    }),
    [contactsOperations.deleteContact.fulfilled]: (store, { payload }) => {
      store.items = store.items.filter(item => item.id !== payload);
      store.loading = false;
    },
    [contactsOperations.deleteContact.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),
    [contactsOperations.addContact.pending]: store => ({
      ...store,
      loading: true,
      error: null,
    }),
    [contactsOperations.addContact.fulfilled]: (store, { payload }) => {
      store.items = [...store.items, payload];
      store.loading = false;
    },
    [contactsOperations.addContact.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),
    [contactsOperations.editContact.pending]: store => ({
      ...store,
      loading: true,
      error: null,
    }),
    [contactsOperations.editContact.fulfilled]: (store, { payload }) => {
      store.items = payload;
      store.loading = false;
    },
    [contactsOperations.editContact.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),
  },
});

// export const itemsReducer = createReducer([], {
//   [contactsOperations.getAllContacts.fulfilled]: (_, { payload }) => payload,
//   [contactsOperations.deleteContact.fulfilled]: (store, { payload }) =>
//     store.filter(contact => contact.id !== payload),
//   [contactsOperations.addContact.fulfilled]: (store, { payload }) => {
//     return !payload ? store : [...store, payload];
//   },
//   [contactsOperations.editContact.fulfilled]: (_, { payload }) => {
//     if (payload) {
//       return payload;
//     }
//   },
// });

// export const loadingReducer = createReducer(false, {
//   [contactsOperations.getAllContacts.pending]: () => true,
//   [contactsOperations.deleteContact.pending]: () => true,
//   [contactsOperations.addContact.pending]: () => true,
//   [contactsOperations.editContact.pending]: () => true,
//   [contactsOperations.getAllContacts.fulfilled]: () => false,
//   [contactsOperations.deleteContact.fulfilled]: () => false,
//   [contactsOperations.addContact.fulfilled]: () => false,
//   [contactsOperations.editContact.fulfilled]: () => false,
//   [contactsOperations.getAllContacts.rejected]: () => false,
//   [contactsOperations.deleteContact.rejected]: () => false,
//   [contactsOperations.addContact.rejected]: () => false,
//   [contactsOperations.editContact.rejected]: () => false,
// });

// export const errorReducer = createReducer(null, {
//   [contactsOperations.getAllContacts.pending]: () => null,
//   [contactsOperations.deleteContact.pending]: () => null,
//   [contactsOperations.addContact.pending]: () => null,
//   [contactsOperations.editContact.pending]: () => null,
//   [contactsOperations.getAllContacts.rejected]: (_, { payload }) => payload,
//   [contactsOperations.deleteContact.rejected]: (_, { payload }) => payload,
//   [contactsOperations.addContact.rejected]: (_, { payload }) => payload,
//   [contactsOperations.editContact.rejected]: (_, { payload }) => payload,
// });
export default contactsSlice.reducer;
