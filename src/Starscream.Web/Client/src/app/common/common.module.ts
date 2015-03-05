/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IAppCommon extends ng.IModule { }

// Create the module and define its dependencies.
var app_common: IAppCommon = angular.module('app_common', [
    // Angular modules 
    'ngResource',       // $resource for REST queries
    'ngAnimate',        // animations
    'ngRoute'           // routing

    // Custom modules 

    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
app_common.run([ '$rootScope', '$route', ( $rootScope: ng.IRootScopeService, $route: ng.route.IRoute) => {
}]);
