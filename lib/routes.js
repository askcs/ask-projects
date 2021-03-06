'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    passport = require('passport');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.get('/api/profile/:id', users.profile);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // Authentication Routes
  // Setting the Facebook oauth routes
  app.get('/auth/facebook',
    passport.authenticate('facebook',
      {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
      }
    ), session.login);

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook',
      {
        failureRedirect: '/signin'
      }
    ), users.authCallback);

  // Setting the Twitter oauth routes
  app.get('/auth/twitter',
    passport.authenticate('twitter',
      {
        failureRedirect: '/signup'
      }
    ), session.login);

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter',
      {
        failureRedirect: '/signup'
      }
    ), users.authCallback);

  // Setting the Google oauth routes
  app.get('/auth/google',
    passport.authenticate('google',
      {
        failureRedirect: '/signup',
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      }
    ), session.login);

  app.get('/auth/google/callback',
    passport.authenticate('google',
      {
        failureRedirect: '/signup'
      }
    ), users.authCallback);




  // Setting the GitHub oauth routes
  app.get('/auth/github',
    passport.authenticate('github',
      {
        failureRedirect: '/signup'
      }
    ), session.login);

  app.get('/auth/github/callback',
    passport.authenticate('github',
      {
        failureRedirect: '/signup'
      }
    ), users.authCallback);



  // Setting the Trello oauth routes
  app.get('/auth/trello',
    passport.authenticate('trello',
      {
        failureRedirect: '/signup'
      }
    ), session.login);

  app.get('/auth/trello/callback',
    passport.authenticate('trello',
      {
        failureRedirect: '/signup'
      }
    ), users.authCallback);




  // All undefined api routes should return a 404
  app.get('/api/*',
    function (req, res)
    {
      res.send(404);
    }
  );
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};