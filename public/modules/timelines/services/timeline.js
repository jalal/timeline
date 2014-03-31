'use strict';

//Articles service used for articles REST endpoint
angular.module('timeline.timelines').factory('TimeLines', ['$resource', function($resource) {
    return $resource('timelines/:timelineId', {
        timelineId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
