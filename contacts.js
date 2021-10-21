const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

//#region HELPER-functions
const readData = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const isIdInContacts = async (contacts, contactId) => {
  return (await contacts.findIndex(({ id }) => (Number(id) === Number(contactId)) !== -1)) ? true : false;
};

const isNameInContacts = async (contacts, newName) => {
  return await contacts.some(({ name }) => name === newName);
};
//#endregion

//#region CONTACTS-functions
const listContacts = async () => {
  return await readData(contactsPath);
};

const getContactById = async (contactId) => {
  const contacts = await readData(contactsPath);

  if (!isIdInContacts(contacts, contactId)) {
    return false;
  }

  return contacts.filter((contact) => Number(contact.id) === Number(contactId));
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
//#endregion

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
