'use strict';

//Setting up route
angular.module('timeline.timelines').config(['$stateProvider',
    function($stateProvider) {
        // timelines state routing
        $stateProvider.
        state('listTimeLines', {
            url: '/timelines',
            templateUrl: 'modules/timelines/views/list.html'
        }).
        state('createTimeLine', {
            url: '/timelines/create',
            templateUrl: 'modules/timelines/views/create.html'
        }).
        state('viewTimeLine', {
            url: '/timelines/:timelineId',
            templateUrl: 'modules/timelines/views/view.html'
        }).
        state('editTimeLine', {
            url: '/timelines/:timelineId/edit',
            templateUrl: 'modules/timelines/views/edit.html'
        });
    }
]);
