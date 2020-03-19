const jira = require('./jira');

describe('getIssueDetails', () => {
  it('should be a function', () => {
    expect(jira.getIssueDetails).toBeInstanceOf(Function);
  });

  it('should get a response', async () => {
    const data = await jira.getIssueDetails('PV-1396');
    expect(data).toBeInstanceOf(Object);
    expect(data.title).toBe('Testing: Als Entwickler möchte ich eine funktionierende Pipeline auf Gitlab haben.');
  });
});
