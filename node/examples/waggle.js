const ServoSix = require('../servosix');
const ss = new ServoSix;
const delay = 500;

ss.set_servo(1, 0);
setTimeout(() => {
	ss.set_servo(1, 180);
}, delay);
ss.cleanup();