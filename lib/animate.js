const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = {
  startScreen: () => {
    clear();
  },

  loadingScreen: () => {
    const interval = 140; // ms
    const frames = ['L', 'LO', 'LOA', 'LOAD', 'LOADI', 'LOADIN', 'LOADING', '', 'LOADING', '', 'LOADING', 'LOADING'];

    return new Promise((resolve, reject) => {
      setTimeout(_ => {
        clear();
        resolve();
      }, interval * frames.length);

      frames.forEach((frame, index) => {
        setTimeout(() => {
          clear();
          console.log(chalk.yellow(figlet.textSync(frame, { horizontalLayout: 'full' })));
        }, index * interval);
      });
    });
  }
};
