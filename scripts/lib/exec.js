const { spawn } = require('child_process');
const colors = require('colors');

module.exports = (a, b) => {
    console.log(colors.yellow(`[EXEC] ${[a, ...b].join(' ')}`));
    return new Promise((rec, rej) => {
        const command = spawn(a, b);

        command.stdout.on('data', (data) => {
            console.log(decodeURIComponent(encodeURIComponent(data.toString()).replace(/(%0A|%0D%0A)$/, '')));
        });

        command.stderr.on('data', (data) => {
            console.error(data.toString());
            //rej(data);
        });

        command.on('close', (code) => {
            rec(code);
        });
    });
};
