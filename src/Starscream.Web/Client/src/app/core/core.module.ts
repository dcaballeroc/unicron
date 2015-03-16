
/// <reference path="../../../typings/angularjs/angular.d.ts" />


interface IAppCore extends ng.IModule { }

// Create the module and define its dependencies.
var appCore: IAppCore = angular.module('app.core', [
    // Angular modules 

    // Custom modules 
    'common.logger'
    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
appCore.run([ () => {
}]);
