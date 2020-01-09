// Load User model
// const User = require("../modules/developers_module/developers_model");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      }
    )
  );
};
//serialize into a session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
//deserialize out of a session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
