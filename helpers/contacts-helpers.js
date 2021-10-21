const fs = require('fs/promises');

const readData = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const searchContactById = async (contacts, contactId) =>
  await contacts.find(({ id }) => Number(id) === Number(contactId));

const isNameInContacts = async (contacts, newName) => await contacts.some(({ name }) => name === newName);

module.exports = {
  readData,
  writeData,
  searchContactById,
  isNameInContacts,
};
