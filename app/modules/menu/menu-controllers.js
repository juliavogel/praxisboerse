'use strict';

angular.module('menu')

    .controller('HeaderController',
        function ($scope, $location, OfferService) {

            $scope.loggedIn = function() {
                return ($location.path() !== '/login');
            };

            $scope.logout = function() {
                $location.path('/login');
            };

            $scope.listBookmarks = function() {
                $location.path('/bookmark');
            };

            OfferService.listOfferTypes(function(response) {
                if (response.success) {
                    $scope.offerOptions = [];
                    for (var key in response.data) {
                        $scope.offerOptions.push({
                            value: response.data[key].shortname,
                            name: response.data[key].name
                        });
                    }
                }
                // TODO else error alert
            });

        });

