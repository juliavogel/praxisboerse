'use strict';

angular.module('menu')

    .controller('HeaderController',
        function ($scope, $location, OfferService) {

            OfferService.listOfferTypes(function(response) {
                if (response.success) {
                    $scope.typeOptions = [];
                    for (var key in response.data) {
                        $scope.typeOptions.push({
                            value: response.data[key].shortname,
                            name: response.data[key].name
                        });
                    }
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

            $scope.loggedIn = function() {
                return ($location.path() !== '/login');
            };

            $scope.logout = function() {
                $location.path('/login');
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

        });

