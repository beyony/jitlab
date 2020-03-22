const fs = require('fs');
const iGit = require('isomorphic-git');

const path = './';

const gitModule = {
  branch: async () => {
    const branch = await iGit.currentBranch({
      fs,
      dir: path,
      fullname: false
    });
    // console.log(branch);
    return branch;
  },
  branches: async () => {
    const branches = await iGit.listBranches({ fs, dir: path });
    // console.log(branches);
    return branches;
  },
  printBranches: () => branches().then(res => console.log(res)),
  branchesExceptCurrent: () =>
    gitModule.branches().then(async res => {
      const current = await gitModule.branch();
      const result = res.filter(b => b !== current);
      // console.log(result);
      return result;
    })
};

module.exports = gitModule;

console.log(gitModule.branchesExceptCurrent());
