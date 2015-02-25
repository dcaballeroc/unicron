/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var app_users = angular.module('app_users');
// Collect the routes
app_users.constant('userRoutes', getRoutes());
// Configure the routes and route resolvers
app_users.config(['$routeProvider', 'userRoutes', function ($routeProvider, routes) {
    routes.forEach(function (r) {
        $routeProvider.when(r.url, r.config);
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
function getRoutes() {
    return [
        {
            url: '/users',
            config: {
                templateUrl: 'app/users/users.html',
                title: 'Users',
                controller: 'users',
                controllerAs: 'vm',
                settings: {
                    nav: 1,
                    content: '<i></i> Dashboard'
                }
            }
        }
    ];
}
//# sourceMappingURL=users.routes.js.map