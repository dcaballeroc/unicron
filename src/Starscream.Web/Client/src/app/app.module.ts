/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />


'use strict';

interface Iapp extends ng.IModule { }

// Create the module and define its dependencies.
var app: Iapp = angular.module('app', [
// Angular modules
    'ngAnimate',        // animations
    'ngRoute',          // routing
    'ngResource',       // $resource for REST queries
    'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

// Custom modules 
    'app_users'
]);

// Handle routing errors and success events
app.run(['$route', ($route: ng.route.IRoute) => {
    // Include $route to kick start the router.
}]);
