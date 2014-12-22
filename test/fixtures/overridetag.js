/**
 * Parent class.
 * @class
 */
function Connection() {}

/**
 * Open the connection.
 * @virtual
 */
Connection.prototype.open = function() {};

/**
 * Close the connection.
 */
Connection.prototype.close = function() {};

/**
 * Child class.
 * @class
 * @extends Connection
 */
function Socket() {}

/** @override */
Socket.prototype.open = function() {};

/**
 * Close the socket.
 * @param {string} message - A message explaining why the socket is being closed.
 * @override
 */
Socket.prototype.close = function() {};
