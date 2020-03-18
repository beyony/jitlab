const chalk = require('chalk');
const branch = require('git-branch');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');
const animate = require('./lib/animate');

if (!files.directoryExists('.git')) {
  console.log(chalk.red('No Git repository found!'));
  process.exit();
}

const run = async () => {
  // await animate();

  const issueIdGuess = parser.parseIssueID(branch.sync());

  const issue = await inquirer.askIssueID(issueIdGuess);

  const mrOptions = await inquirer.askMergeRequestOptions(issue.ID);

  console.log(issue);
  console.log(mrOptions);
};

run();
