const spawn = require('child_process').spawn;

// need to trigger init -- what's the js version?
class ServoSix {
	servo_min = 500;
	servo_max = 2500;

	constructor(servo_min=500, servo_max=2500) {
		this.servo_min = 500;
		this.servo_max = 2500;

		// start the service
		spawn('sudo /etc/init.d/servoblaster start');
	}

	set_servo(servo, angle) {
		if (servo < 1 || servo > 6) 		console.log('Servo 1 to 6');
		else if (angle < 0 || angle > 180)  console.log('Angle 0 to 180');
		else {
			const { servo_max, servo_min } = this;
			const range = servo_max - servo_min;
			const scaler = range / 180;
			const pulse = servo_min + angle * scaler;
			const command = `echo ${servo}=${pulse}us > /dev/servoblaster`;
			spawn(command);
		}
	}

	move_servo(servo, start_angle, end_angle, delay) {
		let inc = 1;
		let angle = start_angle;
		const { set_servo } = this;
		if(start_angle > end_angle) inc = -1;
		else if (start_angle === end_angle) return;
		do {
			angle += inc;
			set_servo(servo, angle);
		} while (angle != end_angle) {
			setTimeout(() => {
				angle += inc;
				set_servo(servo, angle);
			}, delay * 1000);
		}
	}

	cleanup() {
		// stop the service
		spawn('sudo /usr/bin/killal servod');
		// disable it so it doesn't start after reboot
		spawn('sudo update-rc.d servoblaster disable');
	}
}

module.exports = ServoSix;