const JiraClient = require('jira-connector');

function cleanString(value) {
  if (value && typeof value === 'string') {
    // replace all types of quotes
    return value.replace(/["'`]/g, '');
  } else {
    return value;
  }
}

module.exports = {
  getIssueDetails: (issueKey, config) => {
    const jira = new JiraClient({
      host: config.host,
      basic_auth: {
        email: config.email,
        api_token: config.token
      }
    });

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
              title: cleanString(issue.fields.summary),
              description: cleanString(issue.fields.description),
              labels: issue.fields.labels,
              priority: issue.fields.priority.name,
              assignee: issue.fields.assignee && issue.fields.assignee.displayName,
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
