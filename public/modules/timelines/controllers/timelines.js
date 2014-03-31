'use strict';

angular.module('timeline.timelines').controller('TimeLinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'TimeLines',
    function($scope, $stateParams, $location, Authentication, TimeLines) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var timeline = new TimeLines({
                title: this.title,
                events: []
            });
            timeline.$save(function(response) {
                $location.path('timelines/' + response._id);
            });

            this.title = '';
            this.events = [];
        };

        $scope.remove = function(timeline) {
            if (timeline) {
                timeline.$remove();

                for (var i in $scope.timelines) {
                    if ($scope.timelines[i] === timeline) {
                        $scope.timelines.splice(i, 1);
                    }
                }
            } else {
                $scope.timeline.$remove(function() {
                    $location.path('timelines');
                });
            }
        };

        $scope.update = function() {
            var timeline = $scope.timeline;
            if (!timeline.updated) {
                timeline.updated = [];
            }
            timeline.updated.push(new Date().getTime());
            timeline.$update(function() {
                $location.path('timelines/' + timeline._id + '/edit');
            });
        };

        $scope.find = function() {
            TimeLines.query(function(timelines) {
                $scope.timelines = timelines;
            });
        };

        $scope.findOne = function(){
            TimeLines.get({
                timelineId: $stateParams.timelineId
            }, function(timeline){
                var events = timeline.events;
                var prev, curr, distance;
                // assume the events are in the correct order
                _.each(events, function(obj, idx, list) {
                    if (idx === 0) { prev = new Date(obj.startDate);}
                    curr = new Date(obj.startDate);
                    obj.distance = Math.round((curr - prev)/(1000*60*60*24)); // this is days
                    prev = curr;
                });
                $scope.timeline = timeline;
                $scope.newevent = {};
            });
        };

        $scope.addEvent = function(event) {
            var timeline = $scope.timeline;
            timeline.events.push(event);
            timeline.$update(function() {
                $location.path('timelines/' + timeline._id + '/edit');
            });
        };

        $scope.clearEvent = function() {
            $scope.newevent = {};
        };

    }
]);
