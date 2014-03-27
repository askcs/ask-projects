'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    config = require('./config'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    TrelloStrategy = require('passport-trello').Strategy;


/**
 * Passport configuration
 */
passport.serializeUser(function (user, done)
{
  done(null, user.id);
});

passport.deserializeUser(function (id, done)
{
  User.findOne(
    {
      _id: id
    }, '-salt -hashedPassword', function (err, user)
    {
      // don't ever give out the password or salt
      done(err, user);
    }
  );
});


// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function (email, password, done)
  {
    User.findOne(
      {
        email: email
      }, function (err, user)
      {
        if (err) return done(err);

        if (!user)
        {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }

        if (!user.authenticate(password))
        {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }

        return done(null, user);
      }
    );
  }
));


// Facebook Authentication
passport.use(new FacebookStrategy({
    clientID:     config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL:  config.facebook.callbackURL
  },
  function (accessToken, refreshToken, profile, done)
  {
    User.findOne({
        'facebook.id': profile.id
      },
      function (err, user)
      {
        if (err) { return done(err); }

        if (!user)
        {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });

          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
        else
        {
          return done(err, user);
        }
      });
  }
));


//Use twitter strategy
passport.use(new TwitterStrategy({
    consumerKey:    config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL:    config.twitter.callbackURL
  },
  function (token, tokenSecret, profile, done)
  {
    User.findOne({
      'twitter.id_str': profile.id
    },
      function (err, user)
      {
        if (err) { return done(err); }

        if (!user)
        {
          user = new User({
            name: profile.displayName,
            username: profile.username,
            provider: 'twitter',
            twitter: profile._json
          });

          user.save(function (err)
          {
            if (err) console.log(err);

            return done(err, user);
          });
        }
        else
        {
          return done(err, user);
        }
      }
    );
  }
));


//Use google strategy
passport.use(new GoogleStrategy({
    clientID:     config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL:  config.google.callbackURL
  },
  function (accessToken, refreshToken, profile, done)
  {
    console.log('params ->', accessToken, refreshToken, profile, done);

    User.findOne({
        'google.id': profile.id
      },
      function (err, user)
      {
        if (!user)
        {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          });

          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
        else
        {
          return done(err, user);
        }
      }
    );
  }
));


//Use github strategy
passport.use(new GitHubStrategy({
    clientID:     config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL:  config.github.callbackURL
  },
  function (accessToken, refreshToken, profile, done)
  {
    console.log('github params ->', accessToken, refreshToken, profile, done);

    User.findOne({
        'github.id': profile.id
      },
      function (err, user)
      {
        if (!user)
        {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'github',
            github: profile._json
          });

          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
        else
        {
          return done(err, user);
        }
      }
    );
  }
));





//Use Trello strategy
passport.use(new TrelloStrategy({
    consumerKey:     config.trello.clientID,
    consumerSecret: config.trello.clientSecret,
    callbackURL:  config.trello.callbackURL,
    passReqToCallback: true,
    trelloParams: {
      scope: "read,write",
      name: "Ask-Projects",
      expiration: "never"
    }
  },
  function (req, accessToken, refreshToken, profile, done)
  {
    console.log('trello params ->', req, accessToken, refreshToken, profile, done);

    if (!req.user)
    {
      // user is not authenticated, log in via trello or do something else
    }
    else
    {
      // authorize user to use Trello api
    }

    User.findOne({
        'trello.id': profile.id
      },
      function (err, user)
      {
        if (!user)
        {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'trello',
            trello: profile._json
          });

          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
        else
        {
          return done(err, user);
        }
      }
    );
  }
));

module.exports = passport;