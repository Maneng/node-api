const minimist = require('minimist');
const glob = require('glob');
const { resolve } = require('path');
const args = Object.assign({}, minimist(process.argv), minimist(JSON.parse(process.env.npm_config_argv || '{}').original || ''));
const build = require('./build');

const env = (() => {
  if (args.prod || args.production) {
    return 'production';
  }
  if (args.daily) {
    return 'daily';
  }
  if (args.dev || args.development) {
    return 'development';
  }
  if (args.env) {
    return args.env;
  }
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  return 'development';
})();

const services = (() => {
  const filters = (args.s || args.service || '').split(',') || [];
  const directories = glob.sync('service-*', {
    cwd: resolve(__dirname, '../../')
  }) || [];

  if (filters.length > 0) {
    return directories.filter((name) => {
      return filters.some((filter) => name.match(filter));
    });
  }
  return directories;
})();

console.log(`publish ${services.length} services to ${env}:`);
console.log(`- ${services.join('\n- ')}\n`);

let promise = Promise.resolve();

services.forEach((name, index) => {
  promise = promise.then(() => {
    console.log(`Process ${index}/${services.length}`);
    return build(name);
  });
});

promise.then(() => {
  console.info('\nfinish');
}).catch((e) => {
  console.warn(`\nerror: ${e.message || e}`);
  process.exit(-1);
});
