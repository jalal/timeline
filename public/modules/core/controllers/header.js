'use strict';

angular.module('timeline.core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

		$scope.menu = [{
			title: 'Articles',
			link: 'articles',
			uiRoute: '/articles'
		}, /* {
			title: 'New Article',
			link: 'articles/create',
			uiRoute: '/articles/create'
		}, */ {
			title: 'TimeLines',
			link: 'timelines',
			uiRoute: '/timelines'
		}, {
			title: 'Create TimeLine',
			link: 'timelines/create',
			uiRoute: '/timelines/create'
		}
		];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);
