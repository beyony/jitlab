#!/usr/bin/env node

const chalk = require('chalk');
const branch = require('git-branch');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');
const animate = require('./lib/animate');
const jira = require('./lib/jira');
const lab = require('./lib/lab');

const cwd = files.getCurrentDirectory();

if (!files.directoryExists('.git')) {
  console.log(chalk.red('No Git repository found!'));
  process.exit();
}

const run = async () => {
  let config;

  try {
    config = require(cwd + '/jitlab.json');
  } catch (error) {
    console.log(chalk.red('No jitlab.json config file in your repo found. Please a one in the root of your project.'));
    console.log(error);
    process.exit();
  }

  animate.startScreen();

  const foo = await inquirer.askTargetBranch(config && config.mr_def_t_branch);
  console.log('foo', foo);

  // guess the issue key by parsing branch name
  let issueKeyGuess;
  try {
    issueKeyGuess = parser.parseIssueKey(branch.sync());
  } catch (error) {
    console.log(
      chalk.red("Your current branch name doesn't contain one of your jira issue keys defined in the jitlab config.")
    );
  }

  // confirm or rectify the issue key by user
  const issueKey = (await inquirer.askIssueKey(issueKeyGuess)).key;

  // call jira api and animate in parallel
  const [_, issueDetails] = await Promise.all([animate.loadingScreen(), jira.getIssueDetails(issueKey)]);

  // custom error handling for jira api
  if (issueDetails.error && !issueDetails.data) {
    throw new Error(
      'Jira Api Client has errored: ' +
        issueDetails.error +
        '\n this could have several reasons: \n 1. you have no internet connection \n 2. your jira api is invalid or not set in .gitconfig \n 3. you have no permission to use jira api \n 4. your issueKey is invalid '
    );
  }

  // ask for merge request options
  const mrOptions = await inquirer.askMergeRequestOptions(issueDetails.data);

  lab.createMergeRequest(mrOptions);
};

run();
