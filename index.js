#!/usr/bin/env node

// support for .env file to get loaded in to environment variables.
const path = require('path');
const fs = require('fs');
const envFile = path.join(__dirname, '../.env');
try {
  fs.accessSync(envFile, fs.F_OK);
  require('dotenv').config({path: envFile});
} catch (e) {
  // no env file
}

/**
* Module dependencies.
*/
const app = require('./app');
const debug = require('debug')('slack-invite-automation:server');
const http = require('http');

/**
 * Normalize a port into a number, string, or false.
 * @param {int} val
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    }

    return false;
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  debug('Listening on port ' + server.address().port);
}
