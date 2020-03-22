const { exec } = require('child_process');

/*
Options for create-merge-request
-b, --base [optional]                  Base branch name
-t, --target [optional]                Target branch name
-m, --message [optional]               Title of the merge request
-a, --assignee [optional]              User to assign merge request to
-l, --labels [optional]                Comma separated list of labels to assign while creating merge request
-r, --remove_source_branch [optional]  Flag indicating if a merge request should remove the source branch when merging
-s, --squash [optional]                Squash commits into a single commit when merging
-e, --edit [optional]                  If supplied opens edit page of merge request. Prints the merge request URL otherwise
-o, --open [optional]                  If supplied open the page of the merge request. Prints the merge request URL otherwise
-p, --print [deprecated]               Doesn't do anything. Kept here for backward compatibility. Default is print.
-v, --verbose [optional]               Detailed logging emitted on console for debug purpose
-h, --help                             output usage information
*/

function stringifyMergeOpts(opts) {
  return `--message "${opts.message}" --labels "${opts.type}"`;
}

module.exports = {
  createMergeRequest: options => {
    exec(`npx lab merge-request ${stringifyMergeOpts(options)}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
};
