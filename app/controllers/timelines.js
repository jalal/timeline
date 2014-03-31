'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    TimeLine = mongoose.model('TimeLine'),
    _ = require('lodash');

/**
 * create a TimeLine
 */
exports.create = function(req, res) {
    var timeline = new TimeLine(req.body);
    timeline.user = req.user;

    timeline.save(function(err) {
        if (err) {
            console.log('TimeLine:save error: ' + err);
            return res.send('users/signup', {
                errors: err.errors,
                timeline: timeline
            });
        } else {
            res.jsonp(timeline);
        }
    });
};

/**
 * read or show a TimeLine
 */
exports.read = function(req, res) {
    var timeline = req.timeline;
    var evs = timeline.events;
    evs = _.sortBy(evs, function(ev) {
        return ev.startDate;
    });
    timeline.events = evs;
    res.jsonp(timeline);
};

exports.update = function(req, res) {
    var timeline = req.timeline;

    timeline = _.extend(timeline, req.body);

    timeline.save(function(err) {
        if (err) {
            res.render('error', {status: 500});
        } else{
            res.jsonp(timeline);
        }
    });
};

/**
 * delete a TimeLine
 * [Not implemented]
 */
exports.delete = function(req, res) {

};

exports.list = function(req, res) {
    TimeLine.find().exec(function(err, timelines) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(timelines);
        }
    });
};

/**
 * TimeLine middleware
 */
exports.timelineByID = function(req, res, next, id) {
    TimeLine.load(id, function(err, timeline) {
        if (err) return next(err);
        if (!timeline) return next(new Error('Failed to load timeline ' + id));
        req.timeline = timeline;
        next();
    });
};

/**
 * TimeLine authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    // if (req.article.user.id !== req.user.id) {
    //     return res.send(403, 'User is not authorized');
    // }
    next();
};
