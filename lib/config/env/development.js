'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/ask-projects'
  },
  facebook: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  twitter: {
    clientID: "CONSUMER_KEY",
    clientSecret: "CONSUMER_SECRET",
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  google: {
    clientID: "1008871674544-91pfs3b2l3euu40rue002il0ruoetrfg.apps.googleusercontent.com",
    clientSecret: "05d3cf4c1996baa1eff18c24ed532336bcd6b8fc",
    callbackURL: "http://localhost:3000/auth/google/callback"
  }
};