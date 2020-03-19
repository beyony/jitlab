const JiraClient = require('jira-connector');

const jira = new JiraClient({
  host: 'pflegix.atlassian.net',
  basic_auth: {
    // get from .git-config
    email: 'luca.heider@pflegix.de',
    api_token: 'IAEL2DhqkrDhchcPUDZAF25C'
  }
});

module.exports = {
  getIssueDetails: issueKey => {
    return new Promise((resolve, reject) => {
      jira.issue.getIssue(
        {
          issueKey
        },
        function(error, issue) {
          if (error) {
            reject(error);
          } else {
            const data = {
              key: issueKey,
              title: issue.fields.summary,
              description: issue.fields.description,
              labels: issue.fields.labels,
              priority: issue.fields.priority.name,
              assignee: issue.fields.assignee.displayName,
              status: issue.fields.status.name
            };

            // console.log(issue.fields);
            // console.log('data', data);
            resolve(data);
          }
        }
      );
    });
  }
};
