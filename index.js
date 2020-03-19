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

  const [_, issueDetails] = await Promise.all([animate.loadingScreen(), jira.getIssueDetails(issueKey)]);

  // custom error handling
  if (issueDetails.error && !issueDetails.data) {
    throw new Error(
      'Jira Api Client has errored: ' +
        issueDetails.error +
        '\n this could have several reasons: \n 1. you have no internet connection \n 2. your jira api is invalid or not set in .gitconfig \n 3. you have no permission to use jira api \n 4. your issueKey is invalid '
    );
  }

  const mrOptions = await inquirer.askMergeRequestOptions(issueDetails);

  console.log(issueKey);
  console.log(mrOptions);
};

run();
