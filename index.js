const chalk = require('chalk');
const branch = require('git-branch');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');
const animate = require('./lib/animate');
const jira = require('./lib/jira');

if (!files.directoryExists('.git')) {
  console.log(chalk.red('No Git repository found!'));
  process.exit();
}

const run = async () => {
  animate.startScreen();

  const issueKeyGuess = parser.parseIssueKey(branch.sync());

  const issueKey = (await inquirer.askIssueKey(issueKeyGuess)).key;

  await animate.loadingScreen();

  const issueDetails = await jira.getIssueDetails(issueKey);

  const mrOptions = await inquirer.askMergeRequestOptions(issueDetails);

  console.log(issueKey);
  console.log(mrOptions);
};

run();
