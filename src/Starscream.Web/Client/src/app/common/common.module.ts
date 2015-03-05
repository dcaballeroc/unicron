/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


interface IAppCommon extends ng.IModule { }

// Create the module and define its dependencies.
var appCommon: IAppCommon = angular.module('appCommon', [
    // Angular modules 
    'ngResource',       // $resource for REST queries
    'ngAnimate',        // animations
    'ngRoute'           // routing

    // Custom modules 

    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
appCommon.run([ '$rootScope', '$route', ( $rootScope: ng.IRootScopeService, $route: ng.route.IRoute) => {
}]);
