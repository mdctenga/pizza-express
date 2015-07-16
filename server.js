var path = require ('path');

var express = require('express');
var app = express();
var config = require('./config/config.json');

var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;

var models =  require('./models');
var User = models.User;

passport.use( new LocalStrategy(
  function(username, password, done){
    console.log("Local Strategy", username, password);
    User.findOne({
      where: {
        "username": username
      }
    })
      .then(function (user) {
        console.log(user);
      })
    .finally(done);
  })
);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/users', function (req, res) {
  return res.jason({message: "success!"});
});

app.get('/login', function (req, res) {
  return res.render('form'); // for your template
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  session: false
}));

models.sequelize
  .sync()
  .then(function () {
    var server = app.listen(config.port, function () {
    });
  });

// var sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',

// });

// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// var User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });