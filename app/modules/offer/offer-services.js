'use strict';

angular.module('offer')

    .factory('OfferService',
        function(RestService) {

            var service = {};

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

            return service;
        });

