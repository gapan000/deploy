var { exec } = require("child_process");

const commands = [
	`eval $(ssh-agent)`,
	`ssh-add /home/baptiste/.ssh/id_rsa_github_baptiste`,
	`git -C /home/www/foetusfood-backoffice/ pull`, 
	`cd /home/www/foetusfood-backoffice/client`,
	`/usr/local/bin/ng build --prod`,
	`chown -R ubuntu:www /home/www/foetusfood-backoffice`,
	`/usr/local/bin/pm2 restart /home/www/pm2.json`
	//`git -C /home/www/foetusfood-backoffice/ pull`
	//`/usr/local/bin/ng build --prod`
	//`/usr/local/bin/pm2 restart /home/www/pm2.json`
];
const cmd = commands.join(' && ');
console.log(`###### executing: '${cmd}'`);
exec(cmd, function(err, stdout, stderr) {
       	if (err) {
       	        console.log(`error: ${err.message}`);
       	        return;
       	}
       	if (stderr) {
       	        console.log(`${stderr}`);
       	}
       	console.log(`${stdout}`);
});

