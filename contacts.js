const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData, searchContactById, isNameInContacts } = require('./helpers/contacts-helpers.js');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => await readData(contactsPath);

const getContactById = async (contactId) => {
  const contacts = await readData(contactsPath);
  return await searchContactById(contacts, contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readData(contactsPath);
  const removedContact = await !searchContactById(contacts, contactId);

  if (!removedContact) {
    return null;
  }

  const refreshedContacts = contacts.filter(({ id }) => Number(id) !== Number(contactId));

  await writeData(contactsPath, refreshedContacts);

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData(contactsPath);

  if (await isNameInContacts(contacts, name)) {
    return null;
  }

  const newContact = { id: uuidv4(), name, email, phone };

  contacts.push(newContact);

  await writeData(contactsPath, contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
