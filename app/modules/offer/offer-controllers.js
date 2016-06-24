'use strict';

angular.module('offer')

    .controller('OfferController',
        function ($scope, $uibModal, OfferService) {

            $scope.listOffers = function(type, country, search, callback) {
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
                                        if (type == null) {
                                            for (var j in $scope.offerTypes) {
                                                OfferService.listOffers($scope.offerTypes[j].shortname, search, '0', '-1', function (response) {
                                                    if (response.success) {
                                                        for (var key in response.data) {
                                                            if ((country == null) || (country == $scope.countries[response.data[key].countryId].code)) {
                                                                var offer = response.data[key];
                                                                offer.countryName = $scope.countries[offer.countryId].name;
                                                                offer.companyName = $scope.companies[offer.companyId].companyName;
                                                                offer.typeName = $scope.offerTypes[offer.typeId].name;
                                                                offer.contactName =
                                                                    $scope.companies[offer.companyId].contact.formOfAddress + ' '
                                                                    + $scope.companies[offer.companyId].contact.firstName + ' '
                                                                    + $scope.companies[offer.companyId].contact.secondName;
                                                                offer.contactEmail = $scope.companies[offer.companyId].contact.email;
                                                                offer.contactPhone = $scope.companies[offer.companyId].contact.telephone;
                                                                offer.contactFax = $scope.companies[offer.companyId].contact.fax;
                                                                $scope.offers.push(offer);
                                                            }
                                                        }
                                                    }
                                                    if (j == $scope.offerTypes.length - 1) {
                                                        callback();
                                                    }
                                                });
                                            }
                                        } else {
                                            OfferService.listOffers(type, search, '0', '-1', function(response) {
                                                if (response.success) {
                                                    for (var key in response.data) {
                                                        if ((country == null) || (country == $scope.countries[response.data[key].countryId].code)) {
                                                            var offer = response.data[key];
                                                            offer.countryName = $scope.countries[offer.countryId].name;
                                                            offer.companyName = $scope.companies[offer.companyId].companyName;
                                                            offer.typeName = $scope.offerTypes[offer.typeId].name;
                                                            offer.contactName =
                                                                $scope.companies[offer.companyId].contact.formOfAddress + ' '
                                                                + $scope.companies[offer.companyId].contact.firstName + ' '
                                                                + $scope.companies[offer.companyId].contact.secondName;
                                                            offer.contactEmail = $scope.companies[offer.companyId].contact.email;
                                                            offer.contactPhone = $scope.companies[offer.companyId].contact.telephone;
                                                            offer.contactFax = $scope.companies[offer.companyId].contact.fax;
                                                            $scope.offers.push(offer);
                                                        }
                                                    }
                                                }
                                                callback();
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            };

            $scope.showOfferDetail = function(offer) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/offer/offerDetailTemplate.html',
                    controller: 'OfferDetailController',
                    size: 'lg',
                    resolve: {
                        offer: function () {
                            return offer;
                        }
                    }
                });
            };

            $scope.$watch(function() {return OfferService.offerFilter}, function(newValue, oldValue) {
                $scope.setFilterInputDisabled(true);
                $scope.listOffers(newValue.offerType, newValue.offerCountry, newValue.offerSearch, function() {
                    $scope.setFilterInputDisabled(false);
                });
            }, true);

            $scope.setFilterInputDisabled = function(disabled) {
                $('#select-type').prop('disabled', disabled);
                $('#select-country').prop('disabled', disabled);
                $('#input-search').prop('disabled', disabled);
            }

        })

    .controller('OfferDetailController',
        function($scope, $uibModalInstance, offer) {

            $scope.offer = offer;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('BookmarkController',
        function ($scope) {

        });