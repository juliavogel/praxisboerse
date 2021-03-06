'use strict';

angular.module('offer')

    .controller('OfferController',
        function ($scope, $uibModal, OfferService, BookmarkService) {

            $scope.listOffers = function(type, country, search, callback) {
                $scope.showAlert(false);
                $scope.pagingIndex = 0;
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
                                        if ($scope.isMobile()) {
                                            $scope.listOffersOnMobile(0, callback);
                                        } else {
                                            OfferService.listOffers(type, search, '0', '-1', function(response) {
                                                if (response.success) {
                                                    for (var key in response.data) {
                                                        if ((country == null) || (country == $scope.countries[response.data[key].countryId].code)) {
                                                            $scope.addOffer(response.data[key]);
                                                        }
                                                    }
                                                } else {
                                                    $scope.showAlert(true);
                                                }
                                                callback();
                                            });
                                        }
                                    } else {
                                        $scope.showAlert(true);
                                        callback();
                                    }
                                });
                            } else {
                                $scope.showAlert(true);
                                callback();
                            }
                        });
                    } else {
                        $scope.showAlert(true);
                        callback();
                    }
                });
            };

            $scope.addOffer = function(offer) {
                offer.company = $scope.companies[offer.companyId];
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
            };

            $scope.listOffersOnMobile = function(offersAdded, callback) {
                OfferService.listOffers(OfferService.offerFilter.offerType, OfferService.offerFilter.offerSearch, $scope.pagingIndex, '1', function(response) {
                    if (response.success) {
                        for (var key in response.data) {
                            if ((OfferService.offerFilter.offerCountry == null) || (OfferService.offerFilter.offerCountry == $scope.countries[response.data[key].countryId].code)) {
                                $scope.addOffer(response.data[key]);
                                offersAdded++;
                            }
                        }
                        $scope.pagingIndex += response.data.length;
                        if (offersAdded < 10 && response.data.length > 0) {
                            $scope.listOffersOnMobile(offersAdded, callback);
                        } else {
                            callback();
                        }
                    } else {
                        $scope.showAlert(true);
                        callback();
                    }
                });
            };

            $scope.addOffersOnMobile = function() {
                $scope.setInputDisabled(true);
                $scope.listOffersOnMobile(0, function() {
                    $scope.setInputDisabled(false);
                });
            };

            $scope.showAlert = function(showAlert) {
                var alert = $('#offer-list-error-alert');
                if (showAlert) {
                    alert.show();
                } else {
                    alert.css('display', 'none');
                }
            };

            $scope.addBookmark = function(offerId) {
                BookmarkService.addBookmark(offerId, function(response) {
                })
            };

            $scope.removeBookmark = function(offerId) {
                BookmarkService.removeBookmark(offerId, function(response) {
                })
            };

            $scope.toggleBookmark = function(offer) {
                if (offer.onNotepad)  {
                    $scope.addBookmark(offer.id);
                } else {
                    $scope.removeBookmark(offer.id);
                }
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

            $scope.showCompanyDetail = function(offer) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/offer/companyDetailTemplate.html',
                    controller: 'CompanyDetailController',
                    size: 'lg',
                    resolve: {
                        offer: function () {
                            return offer;
                        }
                    }
                });
            };

            $scope.$watch(function() {return OfferService.offerFilter}, function(newValue, oldValue) {
                if (newValue.offerType != null) {
                    $scope.setInputDisabled(true);
                    $scope.listOffers(newValue.offerType, newValue.offerCountry, newValue.offerSearch, function() {
                        $scope.setInputDisabled(false);
                    });
                }
            }, true);

            $scope.setInputDisabled = function(disabled) {
                $('#btn-load-more').prop('disabled', disabled);
                $('#select-type').prop('disabled', disabled);
                $('#select-country').prop('disabled', disabled);
                $('#input-search').prop('disabled', disabled);
            };

            $scope.isMobile = function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            };

        })

    .controller('OfferDetailController',
        function($scope, $uibModalInstance, offer) {

            $scope.offer = offer;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })

    .controller('CompanyDetailController',
        function($scope, $uibModalInstance, OfferService, offer, NgMap) {

            $scope.offer = offer;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $uibModalInstance.rendered.then(function() {
                $('a[data-target="#company-address"]').on('shown.bs.tab', function (e) {
                    NgMap.getMap().then(function(map) {
                        OfferService.getGeocoordinates(offer.companyName, offer.company.street, offer.company.zipCode, offer.company.city, offer.company.country, function(response) {
                            if (response.success) {
                                var location = response.data.results[0].geometry.location;
                                $scope.geocoordinates = [location.lat, location.lng];
                            }
                        });
                        google.maps.event.trigger(map, 'resize');
                        // TODO on resize set center to current position (not company geocoordinates)
                        $(window).resize(function() {
                            map.setCenter({lat: $scope.geocoordinates[0], lng: $scope.geocoordinates[1]});
                            /*var center = map.getCenter();
                            google.maps.event.trigger(map, "resize");
                            map.setCenter(center);*/
                        });
                    });
                });
            });

        })

    .controller('BookmarkController',
        function ($scope,  $uibModal, BookmarkService) {

            $scope.listBookmarks = function(start, count) {
                $scope.offers = [];
                BookmarkService.getNotepad(start, count, function(response) {
                    if (response.success) {
                        var offers = response.data["offers"];
                        var companies = response.data["companies"];
                        var offerTypes = response.data["offerTypes"];
                        var countries = response.data["countries"];
                        for (var key in offers) {
                            var offer = offers[key];
                            offer.company = companies[offer.companyId];
                            offer.companyName = companies[offer.companyId].companyName;
                            offer.typeName = offerTypes[offer.typeId].name;
                            offer.countryName = countries[offer.countryId].name;
                            offer.contactName =
                                offer.contact.formOfAddress + ' '
                                + offer.contact.firstName + ' '
                                + offer.contact.secondName;
                            offer.contactEmail = offer.contact.email;
                            offer.contactPhone = offer.contact.telephone;
                            offer.contactFax = offer.contact.fax;
                            $scope.offers.push(offer);
                        }
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

            $scope.showCompanyDetail = function(offer) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/offer/companyDetailTemplate.html',
                    controller: 'CompanyDetailController',
                    size: 'lg',
                    resolve: {
                        offer: function () {
                            return offer;
                        }
                    }
                });
            };

            $scope.removeBookmark = function(offerId) {
                BookmarkService.removeBookmark(offerId, function(response) {
                    if (response.success) {
                        $scope.listBookmarks(0,-1);
                    }
                })
            };

            $scope.listBookmarks(0,-1);

        });