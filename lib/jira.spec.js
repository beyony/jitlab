const jira = require('./jira');

describe('getIssueDetails', () => {
  it('should be a function', () => {
    expect(jira.getIssueDetails).toBeInstanceOf(Function);
  });

  it('should get a response', async () => {
    const res = await jira.getIssueDetails('PV-1396');
    expect(res).toBeInstanceOf(Object);
    if (res.error) {
      console.log(res.error);
    }
    expect(res.data.title).toBe('Testing: Als Entwickler möchte ich eine funktionierende Pipeline auf Gitlab haben.');
  });
});
