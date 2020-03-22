module.exports = {
  parseIssueKey: (branchName, boardAcronyms = []) => {
    console.log(branchName, boardAcronyms);

    let boardAcronym;

    for (let i = 0; i < boardAcronyms.length; i++) {
      // determine jira board acronym
      const symbol = boardAcronyms[i] + '-';
      if (branchName.includes(symbol)) {
        boardAcronym = symbol;
        break;
      }
    }

    console.log(boardAcronym);

    // if (!boardAcronym) {
    //   throw new Error("Branch name doesn't contain PV- or HD-");
    // }

    // branchName = feature/PV-1396-testing-als-entwickler-moechte-ich-eine
    let s = branchName.substring(branchName.indexOf(boardAcronym) + boardAcronym.length, branchName.length);
    // s = 1396-testing-als-entwickler-moechte-ich-eine
    const end = s.includes('-') ? s.indexOf('-') : s.length;
    s = s.substring(0, end);
    // s = 1396

    return boardAcronym + s;
  }
};
