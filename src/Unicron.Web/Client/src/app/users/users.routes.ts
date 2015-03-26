/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

interface IProvideRoutes {
    getRoutes(): RouteSettings.IAcklenAvenueRoute[];
}

class UserRoutes implements IProvideRoutes {
    getRoutes(): RouteSettings.IAcklenAvenueRoute[] {
            var userTempRoute: RouteSettings.IAcklenAvenueRoute = {
                state: 'users',
                config: {
                    url: '/users',
                    templateUrl: 'app/users/users.html',
                    controller: 'users.controller',
                    controllerAs: 'vm',
                    title: 'users',
                    settings: {
                            nav: 1,
                            content: '<i></i> Users'
                        }
                }
            };
            return [userTempRoute];
        }
}
var appUsers: IAppUsers = angular.module('app.users');
appUsers.constant('userRoutes', new UserRoutes() );
appUsers.run(['userRoutes', 'routeHelper', (userRoutes: UserRoutes, routeHelper: any) => {
     routeHelper.configureStates(userRoutes.getRoutes(), '/');
} ]);

