'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
    req.user = {username: 'Eric', email: 'eric@home.com',displayName: 'Eric Default', lastName: 'Default', firstName: 'Eric'};
	res.render('index.html', {
		user: req.user || null
	});
};
