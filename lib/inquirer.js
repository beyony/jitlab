const inquirer = require('inquirer');

module.exports = {
  askIssueID: guess => {
    const questions = [
      {
        name: 'ID',
        type: 'input',
        default: guess,
        message: 'Enter Issue ID:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Jira Issue ID.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askMergeRequestOptions: issueID => {
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
        default: `Finish Ticket: ${issueID}`,
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
