/* global require module process */
const attenuateProcess = require('attenuate-process');

module.exports = {
  process: attenuateProcess(process),
};
