const git = require('./git');

describe('git', () => {
  it('should have functions', () => {
    expect(git.branches).toBeInstanceOf(Function);
    expect(git.branch).toBeInstanceOf(Function);
  });

  it('should have a master branch', async () => {
    let data = await git.branches();
    expect(data.includes('master')).toBe(true);
  });

  it('should have a current branch', async () => {
    let data = await git.branch();
    expect(typeof data === 'string').toBe(true);
  });

  it('should have at least one branch', async () => {
    data = await git.branches();
    expect(data.length).toBeGreaterThanOrEqual(1);
  });
});
