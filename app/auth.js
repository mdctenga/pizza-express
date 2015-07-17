var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;

var models =  require('../models');
var User = models.User;

passport.serializeUser(function(user, done){
  console.log("serializing user...");
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  return User.findOne({
    where: {'id': id}
  })
  .then(function(user) {
    done(null, user);
  });
});

passport.use( new LocalStrategy(
  function(username, password, done) {
    console.log("Local Strategy", username, password);
    User.findOne({
      where: {
        "username": username
      }
    })
    .then(function (user) {
      if (!user) {
        console.log('no user found!');
        return done(null, false, { message: "User not found!"});
      } else if (user.password !== password) {
        console.log('wrong password!');
        return done(null, false, { message: "Incorrect password!"});
      }
      done(null, user);
    })
    .catch(done); // to catch random edge case explosions
  }
));



module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
};