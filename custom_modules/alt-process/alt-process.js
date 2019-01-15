const attenuateProcess = require('attenuate-process');
const harden = Object.freeze;

module.exports = {
  process: attenuateProcess(process),
};