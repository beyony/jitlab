#!/usr/bin/env node

const chalk = require('chalk');
const branch = require('git-branch');
const parse_git_config = require('parse-git-config');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');
const animate = require('./lib/animate');
const jira = require('./lib/jira');
const lab = require('./lib/lab');
const readConfig = require('./lib/readConfig');

const home_dir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

if (!files.directoryExists('.git')) {
  console.log(chalk.red('No Git repository found!'));
  process.exit();
}

const run = async () => {
  let config;

  try {
    config = readConfig();
  } catch (error) {
    console.log(chalk.red('No jitlab.json config file in your repo found. Please a one in the root of your project.'));
    console.log(error);
    process.exit();
  }

  animate.startScreen();

  const targetBranch = await inquirer.askTargetBranch(config && config.mr_def_t_branch);

  let gitConfig;

  try {
    gitConfig = parse_git_config.sync({ path: home_dir + '/.gitconfig' });
  } catch (error) {
    console.log(
      chalk.red(
        `No .gitconfig found in your home directory: '${home_dir}'. Please create one and add config settings requested in readme.`
      )
    );
  }

  if (!gitConfig.jira) {
    console.log(chalk.red(`No Jira token, email found in your git config: '${home_dir + '/.gitconfig'}'.`));
    console.log(chalk.black(`Add like this: `));
    console.log(chalk.black(`git config --global --add jira.token "xxxxxxxx"`));
    console.log(chalk.black(`git config --global --add jira.email "xxx.xxx@xxx.de"`));
    process.exit();
  }

  // guess the issue key by parsing branch name
  let issueKeyGuess;
  try {
    issueKeyGuess = parser.parseIssueKey(branch.sync(), config.jira_board_acronyms);
  } catch (error) {
    console.log(
      chalk.red(
        "Cannot parse issue key from the name of your current branch. \n Your current branch name doesn't contain one of your jira board acronyms defined in the jitlab config. Please check your config file."
      )
    );
  }

  // confirm or rectify the issue key by user
  const issueKey = (await inquirer.askIssueKey(issueKeyGuess)).key;

  // call jira api and animate in parallel
  const [_, issueDetails] = await Promise.all([
    animate.loadingScreen(),
    jira.getIssueDetails(issueKey, gitConfig.jira)
  ]);

  // custom error handling for jira api
  if (issueDetails.error && !issueDetails.data) {
    throw new Error(
      'Jira Api Client has errored: ' +
        issueDetails.error +
        '\n this could have several reasons: \n 1. you have no internet connection \n 2. your jira api is invalid or not set in .gitconfig \n 3. you have no permission to use jira api \n 4. your issueKey is invalid, check on jira'
    );
  }

  // ask for merge request options
  const mrOptions = await inquirer.askMergeRequestOptions(issueDetails.data);

  mrOptions.targetBranch = targetBranch.branch;

  lab.createMergeRequest(mrOptions);
};

run();
