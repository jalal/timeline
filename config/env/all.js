'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'TimeLine',
		description: 'A TimeLine application',
		keywords: 'timeline, mongodb, express, angularjs, node.js, mongoose, passport'
	},
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'TIMELINE',
	sessionCollection: 'sessions'
};
