const { resolve } = require('path');

module.exports = (name) => {
  console.info('');

  const path = resolve(__dirname, '../../', name);

};
