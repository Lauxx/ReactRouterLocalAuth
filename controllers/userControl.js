var UserModel = require('../models/userModel.js');
var express = require('express');
var app = express();
var passport = require('passport');

module.exports = {
	login: function(req, res, next){
		passport.authenticate('local-login', function(err, user, info){
			console.log('You logged in.', info);
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info.message) }
			req.logIn(user, function(err){
				if(err) { return next(err); }
				return res.json({ message: 'You logged in like a champ!', user: user });
			});	
		})(req, res, next);
	},

	signup: function(req, res, next){
		passport.authenticate('local-signup', function(err, user, info){
			console.log('You signed up.', info);
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info.message); }
			req.logIn(user, function(err){
				if(err) { return next(err); }
				return res.json({ message: 'You signed up like a champ!', user: user });
			})
		})(req, res, next);
	},

	logout: function(req, res){
		req.logout();
		res.json({ message: 'You logged out like a champ!' });
	}
};