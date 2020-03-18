module.exports = {
  parseIssueID: branchName => {
    let boardAcronym;

    if (branchName.includes('PV-')) {
      boardAcronym = 'PV-';
    } else if (branchName.includes('HD-')) {
      boardAcronym = 'HD-';
    } else {
      throw new Error("The branch you're currently working on doesn't contain PV- or HD-");
    }

    // feature/PV-1396-testing-als-entwickler-moechte-ich-eine
    branchName.substring(boardAcronym.indexOf(boardAcronym), boardAcronym.length);
  }
};
