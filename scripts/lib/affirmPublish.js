const readline = require('readline');
const minimist = require('minimist');
const args = minimist(process.argv);

const {exec} = require('child_process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
exec('git branch', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`exec error: ${stderr}`);
    return;
  }
  let canPublish = false;
  let branchName;
  stdout.split('\n').forEach((name) => {
    if (args.daily && (name === '* develop' || name === '* master')) {
      canPublish = true;
    }
    if (args.online && name === '* master') {
      canPublish = true;
    }
    if (name.startsWith('*')) {
      branchName = name;
    }

  });
  if (!canPublish) {
    throw new Error(`current branch=[${branchName}] cant publish to ${args.online ? 'online' : 'daily'}`);
  }

  rl.question(`确认要发布到${args.online ? 'online' : 'daily'}吗?(Y/N)`, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      throw new Error('取消发布');
    }
    rl.close();
  });
});

