// import * as child from 'child_process';
const { exec } = require('child_process');

const commands = [
	`eval $(ssh-agent)`,
	`ssh-add /home/baptiste/.ssh/id_rsa_github_baptiste`,
	`git -C /home/www/foetusfood-backoffice/ pull`, 
	`cd /home/www/foetusfood-backoffice/client`,
	`/usr/local/bin/ng build --prod`,
	`chown -R ubuntu:www /home/www/foetusfood-backoffice`,
	`/usr/local/bin/pm2 restart /home/www/pm2.json`
];

module.exports = function deploy() {
	const cmd = commands.join(' && ');
	console.log(`###### executing: '${cmd}'`);
	exec(cmd, function(err, stdout, stderr) {
		return err
			? `error: ${err.message}`
			: `${stderr}\r\n${stdout}`;
	});
}