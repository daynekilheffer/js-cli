module.exports = function (opts) {
  if (opts.debug || process.env.DEBUG_JSCLI) {
    return function () {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('js-cli (debug) > ');
      console.error.apply(console.log, args);
    }
  }
  return function () {};
};
