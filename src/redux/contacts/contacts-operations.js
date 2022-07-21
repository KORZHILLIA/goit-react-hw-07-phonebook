import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchAllContacts,
  deleteContactFromApi,
  addContactToApi,
  editContactInApi,
} from 'shared/services/api/contacts-api';

const toastSetup = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000,
};

export const getAllContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const allContacts = await fetchAllContacts();
      return allContacts;
    } catch (error) {
      return rejectWithValue(
        toast.error('Server error, try again', {
          ...toastSetup,
          autoClose: false,
        })
      );
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, { rejectWithValue }) => {
    try {
      const addedContact = await addContactToApi(contact);
      return addedContact;
    } catch (error) {
      return rejectWithValue(
        toast.error('Something wrong with contact adding', toastSetup)
      );
    }
  },
  {
    condition: (contact, { getState }) => {
      const {
        contacts: { items },
      } = getState();
      const { name, phone } = contact;
      const isContactPresent = items.find(
        item => item.name === name && item.phone === phone
      );
      if (isContactPresent) {
        toast.error(`${contact.name} is already present`, toastSetup);
        return false;
      }
    },
  }
);

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, { getState, rejectWithValue }) => {
//     try {
//       const {
//         contacts: { items },
//       } = getState();
//       const isAddingContactPresents = items.find(
//         item => item.name === contact.name && item.phone === contact.phone
//       );
//       if (isAddingContactPresents) {
//         toast.error(`${contact.name} is already present`, toastSetup);
//         return;
//       }
//       const addedContact = await addContactToApi(contact);
//       toast.success(`Contact ${addedContact.name} is added`, {
//         ...toastSetup,
//         delay: 1000,
//       });

//       return addedContact;
//     } catch (error) {
//       return rejectWithValue(
//         toast.error('Something wrong with contact adding', toastSetup)
//       );
//     }
//   }
// );

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      const deletedContact = await deleteContactFromApi(id);

      toast.success(`Contact ${deletedContact.name}'s been deleted`, {
        ...toastSetup,
        delay: 0,
      });
      return deletedContact.id;
    } catch (error) {
      return rejectWithValue(
        toast.error(
          'Server is unable to delete this contact, try again later',
          toastSetup
        )
      );
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/edit',
  async (contact, { rejectWithValue }) => {
    try {
      const updatedContacts = await editContactInApi(contact);
      return updatedContacts;
    } catch (error) {
      rejectWithValue(
        toast.error(
          "It's impossible to update this contact at a time, try once again",
          toastSetup
        )
      );
    }
  },
  {
    condition: (contact, { getState }) => {
      const {
        contacts: { items },
      } = getState();
      const { name, phone } = contact;
      const isUpdatedContactPresent = items.find(
        item => item.name === name && item.phone === phone
      );
      if (isUpdatedContactPresent) {
        toast.warn(
          'Contact with these name and phone is already present',
          toastSetup
        );
        return false;
      }
    },
  }
);

// export const editContact = createAsyncThunk(
//   'contacts/editContact',
//   async (contact, { getState, rejectWithValue }) => {
//     try {
//       const {
//         contacts: { items },
//       } = getState();
//       const isUpdatedContactPresent = items.find(
//         item => item.name === contact.name && item.phone === contact.phone
//       );
//       if (isUpdatedContactPresent) {
//         toast.warn(
//           'Contact with these name and phone is already present',
//           toastSetup
//         );
//         return;
//       }
//       const updatedContacts = await editContactInApi(contact);
//       return updatedContacts;
//     } catch (error) {
//       return rejectWithValue(
//         toast.error(
//           "It's impossible to update this contact at a time, try once again",
//           toastSetup
//         )
//       );
//     }
//   }
// );

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
