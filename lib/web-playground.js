'use strict';

var express     = require('express');
var _           = require('lodash');

var attachData  = require('./middleware/attach-data');
var serveAssets = require('./middleware/serve-assets');

var DEFAULT_OPTS = {
  port: 3000,
};

exports.start = function start(opts) {
  var _opts = _.defaults({}, opts, DEFAULT_OPTS);

  var app = express();
  app.use(attachData);
  app.use(serveAssets);
  app.listen(_opts.port);

  var bs = require('browser-sync').create();
  bs.watch('{playground,html,css,javascript}.*').on('change', bs.reload);
  bs.init({ proxy: 'http://localhost:' + _opts.port });
};
