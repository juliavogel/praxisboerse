'use strict';

angular.module('menu')

    .controller('HeaderController',
        function ($rootScope, $scope, $location, OfferService) {

            $scope.loggedIn = function() {
                return ($location.path() !== '/login');
            };

            $scope.filterEnabled = function() {
                return ($location.path() === '/offer');
            };

            $scope.logout = function() {
                $location.path('/login');
            };

            $scope.listOffers = function() {
                $location.path('/offer');
            };

            $scope.listBookmarks = function() {
                $location.path('/bookmark');
            };

            $scope.setOfferType = function(selectType) {
                OfferService.offerFilter.offerType = selectType;
            };

            $scope.setOfferCountry = function(selectCountry) {
                OfferService.offerFilter.offerCountry = selectCountry;
            };

            $scope.setOfferSearch = function(inputSearch) {
                OfferService.offerFilter.offerSearch = inputSearch;
            };

            $scope.initDropdowns = function() {
                OfferService.listOfferTypes(function(response) {
                    if (response.success) {
                        $scope.typeOptions = [];
                        for (var key in response.data) {
                            $scope.typeOptions.push({
                                value: response.data[key].shortname,
                                name: response.data[key].name
                            });
                        }
                        $scope.selectType = response.data[0].shortname;
                        $scope.setOfferType($scope.selectType);
                    }
                });
                OfferService.listCountries(function(response) {
                    if (response.success) {
                        $scope.countryOptions = [];
                        for (var key in response.data) {
                            $scope.countryOptions.push({
                                value: response.data[key].code,
                                name: response.data[key].name
                            });
                        }
                    }
                });
            };

            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                if (current.originalPath === '/offer' && (typeof previous === 'undefined' || previous.originalPath !== '/bookmark')) {
                    $scope.initDropdowns();
                }
            });

        });

