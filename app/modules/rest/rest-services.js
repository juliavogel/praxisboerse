'use strict';

angular.module('rest',['base64'])

    .factory('RestService', function ($http, $q, $cookies) {
        var service = {};
        service.interfaces = {};

        service.interfaces["validateCredentials"] = {method: "GET", path: "/credential/validate"};
        service.interfaces["getOfferTypes"] = {method: "GET", path: "/joboffer/offertypes/all"};
        service.interfaces["getOffers"] = {method: "GET", path: "/joboffer/offers"};
        service.interfaces["getCompaniesWithOffers"] = {method: "GET", path: "/joboffer/companies/withoffers"};
        service.interfaces["getCompany"] = {method: "GET", path: "/joboffer/company"};
        service.interfaces["getCountries"] = {method: "GET", path: "/joboffer/countries/all"};
        service.interfaces["getNotepad"] = {method: "GET", path: "/joboffer/notepad"};
        service.interfaces["addBookmark"] = {method: "POST", path: "/joboffer/notepad/offer"};
        service.interfaces["removeBookmark"] = {method: "DELETE", path: "/joboffer/notepad/offer"};

        service.call = function (key, opts) {
            $http.defaults.headers.common.Authorization = 'Basic ' + $cookies.get('credentials');

            if (typeof opts === "undefined") {
                opts = {};
            }
            var parameter = (typeof opts.parameter === "undefined") ? "" : opts.parameter;
            var data = (typeof opts.data === "undefined") ? "" : opts.data;
            var request = service.interfaces[key];

            opts.method = request.method;
            opts.url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST' + request.path + parameter;
            opts.data = data;
            opts.headers = {'Content-Type': 'application/json'};

            var deferred = $q.defer();
            $http(opts).then(
                function (success) {
                    deferred.$$resolve(success);
                }, function (error) {
                    deferred.$$reject(error);
                });
            return deferred.promise;
        };

        return {
            call: function (key, opts) {
                return service.call(key, opts);
            }
        }
    });

