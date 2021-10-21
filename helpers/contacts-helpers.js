const fs = require('fs/promises');

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

module.exports = {
  readData,
  writeData,
  isIdInContacts,
  isNameInContacts,
};
