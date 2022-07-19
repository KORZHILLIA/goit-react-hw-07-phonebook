import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllContacts,
  deleteContactFromApi,
  addContactToApi,
  editContactInApi,
} from 'shared/services/api/contacts-api';

export const getAllContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const allContacts = await fetchAllContacts();
      return allContacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { getState, rejectWithValue }) => {
    try {
      const {
        contacts: { items },
      } = getState();
      const isAddingContactPresents = items.find(
        item => item.name === contact.name && item.phone === contact.phone
      );
      if (isAddingContactPresents) {
        alert(`${contact.name} is already present`);
        return;
      }
      const addedContact = await addContactToApi(contact);
      return addedContact;
    } catch (error) {
      return rejectWithValue('Something wrong with contact adding');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const deletedContact = await deleteContactFromApi(id);
      setTimeout(
        () => alert(`Contact ${deletedContact.name}'s been deleted`),
        1000
      );
      return deletedContact.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, { getState, rejectWithValue }) => {
    try {
      const {
        contacts: { items },
      } = getState();
      const isUpdatedContactPresent = items.find(
        item => item.name === contact.name && item.phone === contact.phone
      );
      if (isUpdatedContactPresent) {
        alert('Contact with these name and phone is already present');
        return;
      }
      const updatedContacts = await editContactInApi(contact);
      return updatedContacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const getAllContacts = () => async dispatch => {
//   dispatch(allConactsActions.getContactsRequest());
//   try {
//     const allContacts = await fetchAllContacts();
//     dispatch(allConactsActions.getContactsSuccess(allContacts));
//   } catch (error) {
//     dispatch(allConactsActions.getContactsError(error));
//   }
// };

// export const deleteContact = id => dispatch => {
//   dispatch(allConactsActions.deleteContactRequest());
//   try {
//     deleteContactFromApi(id);
//   } catch (error) {
//     dispatch(allConactsActions.deleteContactError(id));
//   }
// };

// export const addContact = contact => async dispatch => {
//   dispatch(allConactsActions.addContactRequest());
//   try {
//     const newContact = await addContactToApi(contact);
//     dispatch(allConactsActions.addContactSuccess(newContact));
//   } catch (error) {
//     dispatch(allConactsActions.addContactError());
//   }
// };
