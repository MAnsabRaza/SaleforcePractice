'use strict';

var server = require('server');
var Logger = require('dw/system/Logger');
var logger = Logger.getLogger('custom', 'sfraBlankPage');

server.get('Throw', function (req, res, next) {
    logger.info('DebugError-Throw route was requested.');
    logger.warn('This route is a temporary error logging exercise.');
    logger.error('About to throw the intentional test error.');

    throw new Error('Intentional SFRA blank page logging test error.');
});

module.exports = server.exports();
