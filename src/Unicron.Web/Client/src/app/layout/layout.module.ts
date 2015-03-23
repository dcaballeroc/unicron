
/// <reference path="../../../typings/angularjs/angular.d.ts" />


interface IAppLayout extends ng.IModule { }

// Create the module and define its dependencies.
var appLayout: IAppLayout = angular.module('app.layout', [
    // Angular modules 

    // Custom modules 
    'app.core'
    // 3rd Party Modules

]);

// Execute bootstrapping code and any dependencies.
appLayout.run([ () => {
}]);
