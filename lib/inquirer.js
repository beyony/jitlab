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
  askMergeRequestOptions: issueKey => {
    const questions = [
      {
        name: 'type',
        type: 'list',
        choices: ['default', 'critical-release-blocker'],
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
        default: `Finish Ticket: ${issueKey}`,
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
