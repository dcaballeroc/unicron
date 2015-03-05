/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
'use strict';
// Create the module and define its dependencies.
var app = angular.module('app', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'app_users'
]);
// Handle routing errors and success events
app.run(['$route', function ($route) {
    // Include $route to kick start the router.
}]);
//# sourceMappingURL=app.module.js.map