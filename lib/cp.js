const cp = require('child_process');

module.exports = {
  promiseExec: cmd =>
    new Promise((resolve, reject) => {
      cp.exec(cmd, (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve(stdout);
      });
    })
};
