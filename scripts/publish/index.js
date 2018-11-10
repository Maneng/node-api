const minimist = require('minimist');
const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || []));
const restart = require('./restart');
const dockerBuild = require('./docker');
const buildHost = '47.97.102.250';
const hosts = args.online ? ['47.97.102.250'] : ['47.97.102.250'];
const main = async () => {
  for (let i = 0; i < hosts.length; i++) {
    await restart({host: hosts[i], mode: args.mode});
  }
};
dockerBuild(buildHost, args.mode, args.online ? 'online' : 'daily').then(() => {
  main().catch((e) => {
    console.log(e);
  });
});
