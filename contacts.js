const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {
  readData,
  writeData,
  searchContactById,
  isNameInContacts,
  isPhoneInContacts,
  isEmailInContacts,
  editContact,
} = require('./helpers/contacts-helpers.js');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = () => readData(contactsPath);

const getContactById = async (contactId) => {
  const contacts = await readData(contactsPath);
  return await searchContactById(contacts, contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readData(contactsPath);
  const removedContact = await searchContactById(contacts, contactId);

  if (!removedContact) {
    return null;
  }

  const refreshedContacts = contacts.filter(({ id }) => Number(id) !== Number(contactId));

  await writeData(contactsPath, refreshedContacts);

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData(contactsPath);

  if ((await isPhoneInContacts(contacts, phone)) || (await isEmailInContacts(contacts, email))) {
    return null;
  }

  const newContact = { id: uuidv4(), name, email, phone };

  contacts.push(newContact);

  await writeData(contactsPath, contacts);

  return newContact;
};

const changeContact = async (contactId, name, email, phone) => {
  if (contactId === void 0) {
    return null;
  }

  const contacts = await readData(contactsPath);
  const searchedContact = await searchContactById(contacts, contactId);

  if (!searchedContact) {
    return null;
  }

  const searchedIndex = await contacts.findIndex(({ id }) => Number(id) === Number(contactId));

  contacts.splice(searchedIndex, 1, editContact(searchedContact, { name, email, phone }));

  await writeData(contactsPath, contacts);

  return searchedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
};
