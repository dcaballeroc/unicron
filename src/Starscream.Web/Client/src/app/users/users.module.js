/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
// Create the module and define its dependencies.
var app_users = angular.module('app_users', [
    'ngResource',
    'ngAnimate',
    'ngRoute'
]);
// Execute bootstrapping code and any dependencies.
app_users.run(['$rootScope', '$route', function ($rootScope, $route) {
}]);
//# sourceMappingURL=users.module.js.map