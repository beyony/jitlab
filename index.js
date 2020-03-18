const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const branch = require('git-branch');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');

clear();
console.log(chalk.yellow(figlet.textSync('gitlab:finish', { horizontalLayout: 'full' })));

if (!files.directoryExists('.git')) {
  console.log(chalk.red('No Git repository found!'));
  process.exit();
}

const run = async () => {
  const guess = parser.parseIssueID(branch.sync());
  const credentials = await inquirer.askIssueID(guess);
  console.log(credentials);
};

run();
