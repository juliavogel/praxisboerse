'use strict';

angular.module('offer')

    .controller('OfferController',
        function ($scope, $uibModal, OfferService) {

            $scope.showOfferDetail = function() {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/offer/offerDetailTemplate.html',
                    controller: 'OfferDetailController',
                    size: 'lg'
                });
            };

            $scope.countries = [];
            $scope.companies = [];
            $scope.offerTypes = [];
            $scope.offers = [];
            OfferService.listCountries(function(response) {
                if (response.success) {
                    for (var key in response.data) {
                        $scope.countries[response.data[key].id] = response.data[key];
                    }
                    OfferService.listCompanies(function(response) {
                        if (response.success) {
                            for (var key in response.data) {
                                $scope.companies[response.data[key].id] = response.data[key];
                            }
                            OfferService.listOfferTypes(function(response) {
                                if (response.success) {
                                    for (var i in response.data) {
                                        $scope.offerTypes[response.data[i].id] = response.data[i];
                                    }
                                    for (var j in $scope.offerTypes) {
                                        OfferService.listOffers($scope.offerTypes[j].shortname, '', '0', '-1', function(response) {
                                            if (response.success) {
                                                for (var key in response.data) {
                                                    var offer = response.data[key];
                                                    offer.countryName = $scope.countries[offer.countryId].name;
                                                    offer.companyName = $scope.companies[offer.companyId].companyName;
                                                    offer.typeName = $scope.offerTypes[offer.typeId].name;
                                                    $scope.offers.push(offer);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });

            /*$scope.sortedOffers = [];

            $scope.$watchCollection('offers', function(newValues, oldValues) {
                console.log(newValues);
            });*/

        })

    .controller('OfferDetailController',
        function($scope, $uibModalInstance) {

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('BookmarkController',
        function ($scope) {

        });