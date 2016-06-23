'use strict';

angular.module('login')

    .factory('LoginService',
        function($cookies, $http, $base64, RestService) {

            var service = {};

            service.login = function(username, password, callback) {
                var credentials = $base64.encode(username + ':' + password);
                service.setCredentials(credentials);
                RestService.call("validateCredentials", {transformResponse: function(data) {return data}})
                    .then(function() {
                        callback({success: true});
                    }, function() {
                        callback({success: false});
                    });
            };

            service.setCredentials = function(credentials) {
                $cookies.put('credentials', credentials);
            };

            service.clearCredentials = function() {
                $cookies.remove('credentials');
            };

            service.loggedIn = function() {
                return $cookies.get('credentials');
            };

            return service;
        });

