const inquirer = require('inquirer');

module.exports = {
  askIssueID: guess => {
    const questions = [
      {
        name: 'issueID',
        type: 'input',
        default: guess,
        message: 'Enter Issue ID:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
