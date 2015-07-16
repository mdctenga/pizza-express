var models = require('../models');

var User = models.User;

models.sequelize
  .sync({force: true})
  .then(function() {
    return User.bulkCreate([
      {
        username: "bob",
        password: "p@$$w0rd!"
      }
    ]);
  }
);