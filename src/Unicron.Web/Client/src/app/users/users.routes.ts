/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

var appUsers: IAppUsers = angular.module('app.users');

// Collect the routes
appUsers.constant('userRoutes', getRoutes());

// Configure the routes and route resolvers
appUsers.config(['$routeProvider', 'userRoutes', ($routeProvider: ng.route.IRouteProvider, routes: RouteSettings.IAcklenAvenueRoute[]) => {

    routes.forEach((r: RouteSettings.IAcklenAvenueRoute) => {
        $routeProvider.when(r.config.url, r.config);
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);

function getRoutes(): RouteSettings.IAcklenAvenueRoute[] {
    'use strict';
    var userTempRoute: RouteSettings.IAcklenAvenueRoute = {
        state: 'Users',
        config: {
            url: '/users',
            templateUrl: 'app/users/users.html',
            controller: 'users.controller',
            controllerAs: 'vm',
            settings: {
                    nav: 1,
                    content: '<i></i> Dashboard'
                }
        }
    };
    return [userTempRoute];
}
