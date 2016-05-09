'use strict';

// Declare all implemented modules with their dependencies
angular.module('rest', []);
angular.module('menu', []);
angular.module('login', ['rest']);
angular.module('offer', ['rest']);

angular.module('app', [
    // Angular modules
    'ngRoute',
    'base64',

    // Project modules
    'rest',
    'menu',
    'login',
    'offer'])

    .controller('AppController', ['$scope',
        function ($scope) {

            // Define globally available functions

        }])

    .config(['$routeProvider',
        function($routeProvider) {

            $routeProvider
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'modules/login/loginTemplate.html'
                })
                .when('/offer', {
                    controller: 'OfferController',
                    templateUrl: 'modules/offer/offerListTemplate.html'
                })
                .otherwise({redirectTo: '/offer'});

        }]);
