/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
// Create the module and define its dependencies.
var users = angular.module('app_users', [
    'ngResource',
    'ngAnimate',
    'ngRoute'
]);
// Execute bootstrapping code and any dependencies.
users.run(['$q', '$rootScope', function ($q, $rootScope) {
}]);
//# sourceMappingURL=users.module.js.map