const inquirer = require('inquirer');
const git = require('./git');

module.exports = {
  askTargetBranch: async guess => {
    const branches = await git.branchesExceptCurrent();
    const questions = [
      {
        name: 'type',
        type: 'list',
        choices: branches,
        default: branches.includes(guess) ? guess : 'master',
        message: 'What is the target branch?:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a branch name.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askIssueKey: guess => {
    const questions = [
      {
        name: 'key',
        type: 'input',
        default: guess,
        message: 'Enter Issue Key:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Jira Issue Key.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askMergeRequestOptions: issueDetails => {
    const isCRB = issueDetails.labels && issueDetails.labels.includes('CriticalReleaseBlocker');
    const questions = [
      {
        name: 'type',
        type: 'list',
        choices: ['Default', 'CriticalReleaseBlocker'],
        default: isCRB ? 'CriticalReleaseBlocker' : 'Default',
        message: 'Enter Merge Request type:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a Merge Request type.';
          }
        }
      },
      {
        name: 'message',
        type: 'input',
        default: `Finish Ticket: ${issueDetails.key} - ${issueDetails.title}`,
        message: 'Enter message:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Merge Request message.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
