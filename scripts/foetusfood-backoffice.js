// import * as child from 'child_process';
const { exec } = require('child_process');
const fs = require('fs');

const commands = [
	`touch /home/www/deploy/foetusfood-backoffice.deploy`,
	`eval $(ssh-agent)`,
	`ssh-add /home/baptiste/.ssh/id_rsa_github_baptiste`,
	`git -C /home/www/foetusfood-backoffice/ pull`, 
	`cd /home/www/foetusfood-backoffice/client`,
	`/usr/local/bin/ng build --prod`,
	`chown -R ubuntu:www /home/www/foetusfood-backoffice /home/www/deploy`,
	`pm2 reload foetusfood-server`,
	`rm /home/www/deploy/foetusfood-backoffice.deploy`
];

module.exports = function deploy() {
	const cmd = commands.join(' && ');
	console.log(`###### Executing:\r\n${cmd}`);
	exec(cmd, function(err, stdout, stderr) {
		const result = err
			? `Errors:\r\n${err.message}`
			: `-----------\r\nWarnings:\r\n${stderr}\r\n-----------\r\nOutputs:\r\n${stdout}`;
		fs.writeFile('/home/www/deploy/logs/foetusfood-backoffice.log', result, function (err) {
                    if (err) return console.log(err);
                });
		return;
	});
}
