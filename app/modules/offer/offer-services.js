'use strict';

angular.module('offer')

    .factory('OfferService',
        function(RestService) {

            var service = {};

            service.clearFilter = function() {
                service.offerFilter = {
                    offerType: null,
                    offerCountry: null,
                    offerSearch: ''
                };
            };

            service.clearFilter();

            service.listOfferTypes = function(callback) {
                RestService.call("getOfferTypes", {transformResponse: function(data) {return data}})
                    .then(function(response) {
                        var offerTypes = JSON.parse(response.data);
                        callback({success: true, data: offerTypes});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.listOffers = function(type, search, start, count, callback) {
                var parameter = '/' + type + '/' + search + '/' + start + '/' + count;
                RestService.call("getOffers", {transformResponse: function(data) {return data}, parameter: parameter})
                    .then(function(response) {
                        var offers = JSON.parse(response.data).offers;
                        callback({success: true, data: offers});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.listCompanies = function(callback) {
                RestService.call("getCompaniesWithOffers", {transformResponse: function(data) {return data}})
                    .then(function(response) {
                        var companies = JSON.parse(response.data);
                        callback({success: true, data: companies});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.getCompany = function(id, callback) {
                RestService.call("getCompany", {transformResponse: function(data) {return data}, parameter: '/' + id})
                    .then(function(response) {
                        var company = JSON.parse(response.data);
                        callback({success: true, data: company});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.listCountries = function(callback) {
                RestService.call("getCountries", {transformResponse: function(data) {return data}})
                    .then(function(response) {
                        var countries = JSON.parse(response.data);
                        callback({success: true, data: countries});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.getGeocoordinates = function(companyName, street, zipCode, city, country, callback) {
                var address = companyName + ", " + street + ", " + zipCode + " " + city + ", " + country;
                var parameter = "address=" + encodeURIComponent(address);
                RestService.call("getGeocoordinates", {transformResponse: function(data) {return data}, parameter: parameter})
                    .then(function(response) {
                        var countries = JSON.parse(response.data);
                        callback({success: true, data: countries});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            return service;
        })

    .factory('BookmarkService',
        function(RestService) {

            var service = {};

            service.getNotepad = function(start, count, callback) {
                var parameter = '/' + start + '/' + count;
                RestService.call("getNotepad", {transformResponse: function(data) {return data}, parameter: parameter})
                    .then(function(response) {
                        var notepad = JSON.parse(response.data);
                        callback({success: true, data: notepad});
                    }, function(response) {
                        callback({success: false, data: response});
                    });
            };

            service.addBookmark = function(offerId, callback) {
                RestService.call("addBookmark", {transformResponse: function(data) {return data}, data: offerId})
                    .then(function(response) {
                        callback({success: true});
                    }, function(response) {
                        callback({success: false});
                    });
            };

            service.removeBookmark = function(offerId, callback) {
                var parameter = '/' + offerId;
                RestService.call("removeBookmark", {transformResponse: function(data) {return data}, data: {}, parameter: parameter})
                    .then(function(response) {
                        callback({success: true});
                    }, function(response) {
                        callback({success: false});
                    });
            };


            return service;

        });

