'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/ask-projects'
  },
  facebook: {
    clientID: "613431995398092",
    clientSecret: "4f26d726d719667ef2098032de5ce58a",
    callbackURL: "http://ask-projects.herokuapp.com/auth/facebook/callback"
  },
  twitter: {
    clientID: "xaDK0HTKlvAED0UYB8aBQ",
    clientSecret: "Jb3WgqNJkFrxTAzsUBGXHOTHT5U65UO2bXdIr0qtK4",
    callbackURL: "http://ask-projects.herokuapp.com/auth/twitter/callback"
  },
  google: {
    clientID: "1008871674544-1ppsrgfbl3g338644d6c7tmdll1u77ee.apps.googleusercontent.com",
    clientSecret: "o49BKum9DfHt-gGJ13Hu2qLS",
    callbackURL: "http://ask-projects.herokuapp.com/auth/google/callback"
  }
};