/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../users.module.ts" />
interface IActivateDeactivateUserRequest {
    id: string;
    enable: boolean;
}
interface IActivateDeactivateUsersService {
    enableUser(id: string): void;
    disableUser(id: string): void;
}

class ActivateDeactivateUsersService implements IActivateDeactivateUsersService {
    static $inject: any = ['httpq'];
    /*@ngInject*/
    constructor(private httpq: IHttpQ) {
    }
    enableUser(id: string): void {

    }
    disableUser(id: string): void {

    }
}

appUsers.factory('usersActivateDeactivateService', ['httpq', (httpq: IHttpQ) => new UsersService(httpq)]);
