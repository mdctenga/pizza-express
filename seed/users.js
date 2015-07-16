var models = require('../models');

var User = models.User;

module.exports = function() {
  User.bulkCreate([
    {
      username: "bob",
      password: "p@$$w0rd!"
    }
  ]);
};
