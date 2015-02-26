/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IApp_users extends ng.IModule { }

// Create the module and define its dependencies.
var app_users: IApp_users = angular.module('app_users', [
    // Angular modules 
    'ngResource',       // $resource for REST queries
    'ngAnimate',        // animations
    'ngRoute'           // routing

    // Custom modules 

    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
app_users.run([ '$rootScope', '$route', ( $rootScope, $route: ng.route.IRoute) => {

}]);
