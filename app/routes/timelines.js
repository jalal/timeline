'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users');
    var timelines = require('../../app/controllers/timelines');

    // Article Routes
    app.get('/timelines', timelines.list);
    app.post('/timelines', /* users.requiresLogin, */ timelines.create);
    app.get('/timelines/:timelineId', timelines.read);
    app.put('/timelines/:timelineId', /* users.requiresLogin, */ timelines.hasAuthorization, timelines.update);
    app.del('/timelines/:timelineId', /* users.requiresLogin, */ timelines.hasAuthorization, timelines.delete);

    // Finish by binding the article middleware
    app.param('timelineId', timelines.timelineByID);
};
