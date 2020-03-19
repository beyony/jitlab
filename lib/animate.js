const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = {
  startScreen: () => {
    clear();
  },

  loadingScreen: () => {
    const interval = 200; // ms
    const frames = ['>', '->', '-->', '--->', '---->', '----->', '------>', '------->', '-------->'];

    return new Promise((resolve, reject) => {
      setTimeout(_ => {
        clear();
        resolve();
      }, interval * frames.length);

      frames.forEach((frame, index, array) => {
        setTimeout(() => {
          clear();
          console.log(chalk.yellow(figlet.textSync(frame, { horizontalLayout: 'full' })));
        }, index * interval);
      });
    });
  }
};
