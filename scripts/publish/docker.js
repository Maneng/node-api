require('node.date-time');
const colors = require('colors');
const exec = require('../lib/exec');

const dockerRegistry = {
  daily: 'yyidan.top:5000',
  online: 'yyidan.top:5000'
};

module.exports = (host, mode, env = 'daily') => {
  const v = new Date().format('YMMddHHmmSS');
  const registry = `${dockerRegistry[env]}/${mode}`;

  console.log(colors.yellow(`[Docker] Build registry and publish to ${registry}:${v}`));

  const command = (cmd) => {
    return exec('ssh', [`admin@${host}`, cmd]);
  };
  const gitBranch = env === 'daily' ? 'master' : 'master';

  const commands = [
    'cd /home/admin/deploy/node-service && git clone https://github.com/Maneng/node-api.git',
    `cd /home/admin/deploy/node-service/node-api && git checkout ${gitBranch} &&  git pull &&git  reset --hard && git pull  && docker build ./ -t ${registry}:${v} && docker tag ${registry}:${v} ${registry}:latest && docker push ${registry}`,
  ];

  let promise = Promise.resolve();

  commands.forEach((cmd) => {
    promise = promise.then(() => {
      return command(cmd);
    });
  });
  return promise;
};
