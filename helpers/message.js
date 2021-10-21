const chalk = require('chalk');

const showSuccessMsgWithData = (message, data) => {
  console.log(chalk.green.bgBlack(message));
  console.table(data);
};

const showWarnMsg = (message) => {
  console.warn(chalk.yellow.bgBlack(message));
};

const showErrorMsg = (message) => {
  console.error(chalk.redBright(message));
};

module.exports = {
  showSuccessMsgWithData,
  showWarnMsg,
  showErrorMsg,
};
