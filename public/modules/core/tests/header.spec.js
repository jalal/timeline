'use strict';

(function() {
	describe('timeline controllers', function() {
		describe('HeaderController', function() {
			//Initialize global variables
			var scope,
				HeaderController;

			// Load the main application module
			beforeEach(module('timeline'));

			beforeEach(inject(function($controller, $rootScope) {
				scope = $rootScope.$new();

				HeaderController = $controller('HeaderController', {
					$scope: scope
				});
			}));

			it('should expose the authentication service', function() {
				expect(scope.authentication).toBeTruthy();
			});
		});
	});
})();
