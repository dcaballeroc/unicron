/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IAppUsers extends ng.IModule { }

// Create the module and define its dependencies.
var app_users: IAppUsers = angular.module('app_users', [
    // Angular modules 
    'ngResource',       // $resource for REST queries
    'ngAnimate',        // animations
    'ngRoute'           // routing

    // Custom modules 

    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
app_users.run([ '$rootScope', '$route', ( $rootScope: ng.IRootScopeService, $route: ng.route.IRoute) => {
}]);
