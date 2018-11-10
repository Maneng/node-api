const exec = require('../lib/exec');

function start(host, mode) {
  return exec('ssh',
    [
      `admin@${host}`,
      `source ~/.bashrc && cd /home/admin/deploy/${mode}  && git pull && make`
    ]
  );
}

module.exports = ({host, mode, isOnline = false}) => {
  return start(host, mode);
};
