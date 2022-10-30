const Salty = require('./lib/salty');

module.exports = {
  taffy: (items) => {
    return new Salty(items);
  },
};
