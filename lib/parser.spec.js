const parser = require('./parser');

describe('parseIssueKey', function() {
  const testCases = [
    ['feature/PV-1396-testing-als-entwickler-moechte-ich-eine', 'PV-1396'],
    ['feature/PV-1-testing-als-entwickler-moechte-ich-eine', 'PV-1'],
    ['feature/PV-1334534534596-testing-als-entwickler-moechte-ich-eine', 'PV-1334534534596'],
    ['bug/PV-1396-testing-als-entwickler-moechte-ich-eine', 'PV-1396'],
    ['PV-1396-testing-als-entwickler-moechte-ich-eine', 'PV-1396'],
    ['PV-132345272596-testing-als-entwickler-moechte-ich-eine', 'PV-132345272596'],
    ['feature/PV-1396', 'PV-1396'],
    ['PV-1396', 'PV-1396'],
    ['PV-1396-', 'PV-1396'],
    ['feature/HD-1396-testing-als-entwickler-moechte-ich-eine', 'HD-1396'],
    ['feature/HD-1-testing-als-entwickler-moechte-ich-eine', 'HD-1'],
    ['feature/HD-1334534534596-testing-als-entwickler-moechte-ich-eine', 'HD-1334534534596'],
    ['bug/HD-1396-testing-als-entwickler-moechte-ich-eine', 'HD-1396'],
    ['HD-1396-testing-als-entwickler-moechte-ich-eine', 'HD-1396'],
    ['HD-132345272596-testing-als-entwickler-moechte-ich-eine', 'HD-132345272596'],
    ['feature/HD-1396', 'HD-1396'],
    ['HD-1396', 'HD-1396'],
    ['HD-1396-', 'HD-1396']
  ];

  it('should be a function', () => {
    expect(parser.parseIssueKey).toBeInstanceOf(Function);
  });

  it('should throw error when no board Key is found', () => {
    try {
      parser.parseIssueKey('feature/find-all-my-pants');
    } catch (e) {
      expect(e.message).toBe("Branch name doesn't contain PV- or HD-");
    }
  });

  it('should work for standard case', () => {
    expect(parser.parseIssueKey(testCases[0][0])).toBe(testCases[0][1]);
  });

  it('should work for all cases', () => {
    testCases.forEach(testCase => {
      expect(parser.parseIssueKey(testCase[0])).toBe(testCase[1]);
    });
  });
});
