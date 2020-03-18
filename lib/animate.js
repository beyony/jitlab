const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = () => {
  const interval = 100; // ms
  const frames = ['>', '->', '-->', '--->', '---->', '----->'];

  return new Promise((resolve, reject) => {
    resolve();
    frames.forEach((frame, index, array) => {
      setTimeout(() => {
        clear();
        console.log(chalk.yellow(figlet.textSync(frame, { horizontalLayout: 'full' })));
      }, index * interval);
      if (index === array.length) {
        console.log('resolveeeee');
      }
    });
  });
};
