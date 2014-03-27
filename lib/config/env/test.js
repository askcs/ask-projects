'use strict';

module.exports = {
  env: 'test',
  mongo: {
    uri: 'mongodb://localhost/ask-projects'
  },
  github: {
    clientID: "5ba160ef9add1cf36c2e",
    clientSecret: "a4fe9f814532b39e10a75d945f516e0d416f36eb",
    callbackURL: "http://localhost:9000/auth/github/callback"
  },
  facebook: {
    clientID: "613431995398092",
    clientSecret: "4f26d726d719667ef2098032de5ce58a",
    callbackURL: "http://localhost:9000/auth/facebook/callback"
  },
  twitter: {
    clientID: "xaDK0HTKlvAED0UYB8aBQ",
    clientSecret: "Jb3WgqNJkFrxTAzsUBGXHOTHT5U65UO2bXdIr0qtK4",
    callbackURL: "http://localhost:9000/auth/twitter/callback"
  },
  google: {
    clientID: "1008871674544-1ppsrgfbl3g338644d6c7tmdll1u77ee.apps.googleusercontent.com",
    clientSecret: "o49BKum9DfHt-gGJ13Hu2qLS",
    callbackURL: "http://localhost:9000/auth/google/callback"
  }
};