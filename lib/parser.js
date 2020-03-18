module.exports = {
  parseIssueID: branchName => {
    let boardAcronym;

    // determine jira board acronym
    if (branchName.includes('PV-')) {
      boardAcronym = 'PV-';
    } else if (branchName.includes('HD-')) {
      boardAcronym = 'HD-';
    } else {
      throw new Error("Branch name doesn't contain PV- or HD-");
    }

    // branchName = feature/PV-1396-testing-als-entwickler-moechte-ich-eine
    let s = branchName.substring(branchName.indexOf(boardAcronym) + boardAcronym.length, branchName.length);
    // s = 1396-testing-als-entwickler-moechte-ich-eine
    const end = s.includes('-') ? s.indexOf('-') : s.length;
    s = s.substring(0, end);
    // s = 1396

    return boardAcronym + s;
  }
};
