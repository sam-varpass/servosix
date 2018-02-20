const { spawn } = require('child_process');

console.log('Installing ServoBlaster by Richard Hirst');
spawn('sudo make');
spawn('sudo make install');