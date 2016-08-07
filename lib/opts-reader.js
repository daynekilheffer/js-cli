const args = require('command-line-args');

module.exports = args([
  {
    name: 'debug',
    type: Boolean,
    defaultValue: false
  },
  {
    name: 'file',
    type: String,
    alias: 'f'
  },
  {
    name: 'command',
    type: String,
    defaultOption: true,
    alias: 'c'
  }
]);
