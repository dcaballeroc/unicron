/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';
var app = angular.module('app_users');
// Collect the routes
app.constant('userRoutes', getRoutes());
// Configure the routes and route resolvers
app.config(['$routeProvider', 'userRoutes', function ($routeProvider, routes) {
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
                settings: {
                    nav: 1,
                    content: '<i></i> Dashboard'
                }
            }
        }
    ];
}
//# sourceMappingURL=users.routes.js.map