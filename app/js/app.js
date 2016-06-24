'use strict';

// Declare all implemented modules with their dependencies
angular.module('rest', []);
angular.module('menu', ['offer']);
angular.module('login', ['rest']);
angular.module('offer', ['rest']);

angular.module('app', [
    // Angular modules
    'ngRoute',
    'ngCookies',
    'base64',
    'ui.bootstrap',

    // Project modules
    'rest',
    'menu',
    'login',
    'offer'])

    .controller('AppController',
        function ($scope) {

            // Define globally available functions and parameters

        })

    .directive('ngEnter', function() {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })

    .config(
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
                .when('/bookmark', {
                    controller: 'BookmarkController',
                    templateUrl: 'modules/offer/bookmarkListTemplate.html'
                })
                .otherwise({redirectTo: '/offer'});

        })

    .run(
        function($rootScope, $location, LoginService) {

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if (next.originalPath === '/login') {
                    LoginService.clearCredentials();
                } else if (!LoginService.loggedIn()) {
                    $location.path('/login');
                }
            });

        });
