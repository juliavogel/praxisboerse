'use strict';

angular.module('login')

    .controller('LoginController', ['$scope', '$location',
        function ($scope, $location) {

            $scope.login = function() {
                $location.path('/offer');
            };

        }]);