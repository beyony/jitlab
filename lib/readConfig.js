const files = require('./files');

module.exports = () => {
  const cwd = files.getCurrentDirectory();
  const config = require(cwd + '/jitlab.json');
  return config;
};
