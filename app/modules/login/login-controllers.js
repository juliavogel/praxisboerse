'use strict';

angular.module('login')

    .controller('LoginController',
        function ($scope, $location, LoginService) {

            $scope.alerts = [];

            $scope.login = function() {
                LoginService.login($scope.username, $scope.password, function(response) {
                    if (response.success) {
                        $location.path('/offer');
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'Login fehlgeschlagen.'});
                    }
                });
            };

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

        });