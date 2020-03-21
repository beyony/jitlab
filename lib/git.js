const os = require('os');
const cp = require('child_process');

const REGEX_STAR = /^\*\s*/g;

const promiseExec = cmd =>
  new Promise((resolve, reject) => {
    cp.exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });

const branchLines = str =>
  str
    .trim()
    .split(os.EOL)
    .map(line => line.trim().replace(REGEX_STAR, ''));

module.exports = {
  branches: () => promiseExec('git branch -a').then(res => branchLines(res)),
  branch: () => promiseExec('git branch -a').then(res => branchLines(res)[0]),
  printBranches: () => branches().then(res => console.log(res))
};
