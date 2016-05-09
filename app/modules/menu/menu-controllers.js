'use strict';

angular.module('menu')

    .controller('HeaderController', ['$scope', '$location',
        function ($scope, $location) {

            $scope.loggedIn = function() {
                return ($location.path() !== '/login');
            };

            $scope.logout = function() {
                $location.path('/login');
            };

        }]);

