'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');


/**
 * Create user
 */
exports.create = function (req, res, next)
{
  var newUser = new User(req.body);

  newUser.provider = 'local';

  newUser.save(function (err)
  {
    if (err) return res.json(400, err);
    
    req.logIn (newUser,
      function(err)
      {
        if (err) return next(err);

        return res.json(req.user.userInfo);
      }
    );
  });
};


/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next)
{
  var userId = req.params.id;

  User.findById(userId,
    function (err, user)
    {
      if (err) return next(err);

      if (!user) return res.send(404);

      res.send({ profile: user.profile });
    }
  );
};

/**
 *  Get more profile information of specified user
 */
exports.profile = function (req, res, next)
{
  var userId = req.params.id;

  User.find({
      name: userId
    },
    function (err, user)
    {
      if (err) return next(err);

      if (!user) return res.send(404);

      res.send({ profile: user });
    }
  );
};


/**
 * Change password
 */
exports.changePassword = function (req, res, next)
{
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId,
    function (err, user)
    {
      if (user.authenticate(oldPass))
      {
        user.password = newPass;

        user.save(function (err)
        {
          if (err) return res.send(400);

          res.send(200);
        });
      }
      else
      {
        res.send(403);
      }
    }
  );
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res)
{
  res.redirect('/');
};


/**
 * Get current user
 */
exports.me = function (req, res)
{
  console.log('user -->', req.user);

  res.json(req.user || null);
};