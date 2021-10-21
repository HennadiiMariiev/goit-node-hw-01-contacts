const fs = require('fs/promises');
const path = require('path');
const { readData, writeData, isIdInContacts, isNameInContacts } = require('./helpers/contacts-helpers.js');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  return await readData(contactsPath);
};

const getContactById = async (contactId) => {
  const contacts = await readData(contactsPath);

  if (!isIdInContacts(contacts, contactId)) {
    return false;
  }

  return contacts.filter(({ id }) => Number(id) === Number(contactId));
};

const removeContact = async (contactId) => {
  const contacts = await readData(contactsPath);

  if (!isIdInContacts(contacts, contactId)) {
    return false;
  }

  const removedContact = contacts.find(({ id }) => Number(id) === Number(contactId));
  const refreshedContacts = contacts.filter(({ id }) => Number(id) !== Number(contactId));

  await writeData(contactsPath, refreshedContacts);

  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData(contactsPath);

  if (await isNameInContacts(contacts, name)) {
    return false;
  }

  const newId = contacts.reduce((prevId, { id }) => (Number(id) > prevId ? Number(id) : prevId), 0) + 1;
  const newContact = { id: newId, name, email, phone };

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
