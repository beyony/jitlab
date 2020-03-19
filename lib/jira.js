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
    // custom error handling
    const result = { data: undefined, error: undefined };
    return new Promise(resolve => {
      jira.issue.getIssue(
        {
          issueKey
        },
        function(error, issue) {
          if (error) {
            result.error = error;
            resolve(result);
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
            result.data = data;
            resolve(result);
          }
        }
      );
    });
  }
};
