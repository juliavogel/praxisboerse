'use strict';

angular.module('menu')

    .directive('headerView', [function () {
        return {
            controller: 'HeaderController',
            replace: true,
            restrict: 'E',
            templateUrl: 'modules/menu/headerTemplate.html'
        };
    }]);