const inquirer = require('inquirer');

module.exports = {
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
        choices: ['default', 'CriticalReleaseBlocker'],
        default: isCRB ? 'CriticalReleaseBlocker' : 'default',
        message: 'Enter ticket type:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a merge request type.';
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
            return 'Please enter merge request message.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
