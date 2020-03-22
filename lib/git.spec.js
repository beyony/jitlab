const git = require('./git');
const cp = require('./cp');

// actually things should be mocked here.. but it's a lot easier not to..
describe('git', () => {
  let branch_initial;
  const rndmBranches = [
    '__rndm__branch__1',
    '__rndm__branch__2',
    '__rndm__branch__3',
    '__rndm__branch__4',
    '__rndm__branch__5'
  ];

  beforeAll(async () => {
    // make new branches
    branch_initial = await await git.branch();
    await cp.promiseExec(`git branch ${rndmBranches[0]}`);
  });

  afterAll(async () => {
    // delete new branches
    await cp.promiseExec(`git checkout ${branch_initial}`);
    await cp.promiseExec(`git branch -d ${rndmBranches[0]}`);
  });

  it('should have functions', () => {
    expect(git.branches).toBeInstanceOf(Function);
    expect(git.branch).toBeInstanceOf(Function);
    expect(git.branchesExceptCurrent).toBeInstanceOf(Function);
  });

  it('should have a current branch', async () => {
    let data = await git.branch();
    expect(typeof data === 'string').toBe(true);
  });

  it('should have at least one branch', async () => {
    data = await git.branches();
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  it('should show the current branch when checked out', async () => {
    rndmBranches.forEach(async expectedValue => {
      await cp.promiseExec(`git checkout ${expectedValue}`);
      const actualValue = await git.branch;
      expect(actualValue).toBe(expectedValue);
    });
  });

  it('should give all branches except the current', async () => {
    const currentBranch = await git.branch();
    const branchesExceptCurrent = await git.branchesExceptCurrent();
    const allBranches = await git.branches();
    expect(branchesExceptCurrent.length).toBe(allBranches.length - 1);
    expect(branchesExceptCurrent.includes(currentBranch)).toBe(false);
  });
});
