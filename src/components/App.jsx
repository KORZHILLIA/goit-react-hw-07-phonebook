import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllContacts,
  deleteContact,
  addContact,
  editContact,
} from 'redux/contacts/contacts-operations';
import { setFilter } from 'redux/filter/filter-actions';
import {
  getFilteredContacts,
  getContactsLoadingAndError,
} from 'redux/filtered-contacts-selector';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Modal from 'shared/components/Modal';
import ContactEditor from './ContactEditor';

export const App = () => {
  const [modal, setModal] = useState({
    isModalOpen: false,
    contact: null,
  });

  const { contact } = modal;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(getFilteredContacts);
  const { loading, error } = useSelector(getContactsLoadingAndError);

  function addContactToGlobalStore(contact) {
    dispatch(addContact(contact));
  }

  function deleteClickHandler(id) {
    dispatch(deleteContact(id));
  }

  function setGlobalFilter(letter) {
    dispatch(setFilter(letter));
  }

  function openModalHandler(contact) {
    setModal({ isModalOpen: true, contact });
  }

  function closeModalHandler(updatedContact) {
    setModal(prevState => ({ ...prevState, isModalOpen: false }));
    if (!updatedContact) {
      return;
    }
    const totallyUpdatedContactInfo = { ...contact, ...updatedContact };
    dispatch(editContact(totallyUpdatedContactInfo));
  }

  const { isModalOpen } = modal;

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactToGlobalStore} />
      <h2>Contacts</h2>
      <Filter onChange={setGlobalFilter} />
      {error && <p>Error occured, try once again</p>}
      {loading && <p>loading...</p>}
      <ContactList
        contacts={filteredContacts}
        deleteClickHandler={deleteClickHandler}
        openModalHandler={openModalHandler}
      />
      {isModalOpen && (
        <Modal>
          <ContactEditor onSubmit={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
};
