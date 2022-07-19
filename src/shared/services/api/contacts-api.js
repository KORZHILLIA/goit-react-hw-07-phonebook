import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://62d032381cc14f8c088661c2.mockapi.io',
  params: {
    l: 10,
    sortBy: 'createdAt',
    order: 'desc',
  },
});

const fetchAllContacts = async (p = 1) => {
  const { data } = await instance('/contacts', {
    params: {
      p,
    },
  });
  return data;
};

const deleteContactFromApi = async id => {
  const { data } = await instance.delete(`/contacts/${id}`);
  return data;
};

const addContactToApi = async contact => {
  const { data } = await instance.post('/contacts', contact);
  return data;
};

const editContactInApi = async contactToUpdate => {
  const { id } = contactToUpdate;
  await instance.put(`/contacts/${id}`, contactToUpdate);
  return fetchAllContacts();
};

export {
  fetchAllContacts,
  deleteContactFromApi,
  addContactToApi,
  editContactInApi,
};
