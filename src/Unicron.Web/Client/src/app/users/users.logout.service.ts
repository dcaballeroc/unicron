/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />
interface IUserLogoutService {
    Logout(): void;
}

class UserLogoutService implements IUserLogoutService {

    static $inject: any = ['currentUser'];
    /*@ngInject*/
    constructor(private currentUser: ICurrentUserManager) {
    }
    Logout(): void {
        this.currentUser.RemoveUser();
    }
}
appUsers.factory('userLogoutService', ['currentUser',
    (currentUser: ICurrentUserManager) => new UserLogoutService(currentUser)]);
