const os = require('os');
const cp = require('./cp');

const REGEX_STAR = /^\*\s*/g;

const branchLines = str =>
  str
    .trim()
    .split(os.EOL)
    .map(line => line.trim().replace(REGEX_STAR, ''));

const gitModule = {
  branches: () => cp.promiseExec('git branch -a').then(res => branchLines(res)),
  branch: () => cp.promiseExec('git rev-parse --abbrev-ref HEAD'),
  printBranches: () => branches().then(res => console.log(res)),
  branchesExceptCurrent: () => gitModule.branches().then(res => res.slice(1, res.length))
};

module.exports = gitModule;
