const path = require('path');
const { Command } = require('commander');

const { showSuccessMsgWithData, showWarnMsg, showErrorMsg } = require('./helpers/message.js');
const { listContacts, getContactById, removeContact, addContact, changeContact } = require('./contacts.js');

const contactsPath = path.join(__dirname, './db/contacts.json');

const program = new Command();

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const fileStr = await listContacts();
        showSuccessMsgWithData(`File: ${contactsPath}`, fileStr);
        break;

      case 'get':
        const contact = await getContactById(id);

        if (!contact) {
          return showWarnMsg(`Searched ID "${id}" not found.`);
        }

        showSuccessMsgWithData(`Searched ID: ${id}`, contact);
        break;

      case 'add':
        const newContact = await addContact(name, email, phone);

        if (!newContact) {
          return showWarnMsg(`Contact with this email or phone already exists.`);
        }

        showSuccessMsgWithData(`New contact added.`, newContact);
        break;

      case 'remove':
        const removedContact = await removeContact(id);

        if (!removedContact) {
          return showWarnMsg(`Can't remove: Contact with ID "${id}" not found.`);
        }

        showSuccessMsgWithData(`Contact removed.`, removedContact);
        break;

      case 'change':
        const changedContact = await changeContact(id, name, email, phone);

        if (!changedContact) {
          return showWarnMsg(`Can't edit: Contact with ID "${id}" not found.`);
        }

        showSuccessMsgWithData(`Contact changed.`, changedContact);
        break;

      default:
        showWarnMsg('Unknown action type!');
    }
  } catch (error) {
    showErrorMsg(error);
  }
})(argv);
