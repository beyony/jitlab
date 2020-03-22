const os = require('os');
const cp = require('./cp');

// ! use library instead.

const REGEX_STAR = /^\*\s*/g;

const branchLines = str =>
  str
    .trim()
    .split(os.EOL)
    .map(line => line.trim().replace(REGEX_STAR, ''));

const gitModule = {
  branches: () => cp.promiseExec('git branch -a').then(res => branchLines(res)),
  branch: () => cp.promiseExec('git rev-parse --abbrev-ref HEAD').then(res => res.trim()),
  printBranches: () => branches().then(res => console.log(res)),
  branchesExceptCurrent: () =>
    gitModule.branches().then(async res => {
      const current = await gitModule.branch();
      console.log('res', res);
      console.log('current', current);
      const result = res.filter(b => b !== current.trim());
      console.log('result', res.indexOf(current));

      return result;
    })
};

module.exports = gitModule;
