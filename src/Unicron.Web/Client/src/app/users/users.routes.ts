/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

interface IProvideRoutes {
    getRoutes(): RouteSettings.IAcklenAvenueRoute[];
}

class UserRoutes implements IProvideRoutes {
    getRoutes(): RouteSettings.IAcklenAvenueRoute[] {
            var userRoutes: RouteSettings.IAcklenAvenueRoute [] = [
                {
                    state: 'users',
                    config: {
                        url: '/users',
                        templateUrl: 'app/users/users.html',
                        controller: 'users.controller',
                        controllerAs: 'vm',
                        title: 'users',
                        settings: {
                            nav: 2,
                            content: '<i></i> Users',
                            showInMenu: true
                        }
                    }
                },
                {
                    state: 'login',
                    config: {
                        url: '/login',
                        templateUrl: 'app/users/users.login.html',
                        controller: 'users.login.controller',
                        controllerAs: 'vm',
                        title: 'Login',
                        settings: {
                            nav: 1,
                            content: '<i></i> Login',
                            showInMenu: false
                        }
                    }
                },
            ];


            return userRoutes;
        }
}
var appUsers: IAppUsers = angular.module('app.users');
appUsers.constant('userRoutes', new UserRoutes() );
appUsers.run(['userRoutes', 'routeHelper', (userRoutes: UserRoutes, routeHelper: any) => {
     routeHelper.configureStates(userRoutes.getRoutes(), '/');
} ]);

