/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="core.module.ts" />
interface ICurrentUser {
    email: string;
    name: string;
    token: string;
    expires: Date
}
interface ICurrentUserManager {
    GetUser(): ICurrentUser;
    SetUserLocal (email: string, name: string,  token: string, expires: Date): void;
    SetUserOnSession (email: string, name: string,  token: string, expires: Date): void;
}
class CurrentUserManager implements ICurrentUserManager {
    currentUser: ICurrentUser;
    windowsKey: string;
    static $inject: any = ['$window'];
    /*@ngInject*/
    constructor(private $window: ng.IWindowService) {
        this.currentUser = undefined;
        this.windowsKey = 'user';
    }
    GetUser(): ICurrentUser {
        return undefined;
    }
    SetUserLocal(email: string, name: string, token: string, expires: Date): void {
        this.SetUser(email, name, token, expires);
        var userString: string = JSON.stringify(this.currentUser);
        this.$window.localStorage.setItem(this.windowsKey, userString);
    }
    private SetUser(email: string, name: string, token: string, expires: Date): void {
         this.currentUser = {
            email : email,
            name : name,
            token : token,
            expires : expires
        };
    }
     SetUserOnSession(email: string, name: string, token: string, expires: Date): void {
         this.SetUser(email, name, token, expires);
         var userString: string = JSON.stringify(this.currentUser);
         this.$window.sessionStorage.setItem(this.windowsKey, userString);
     }
}

appCore.factory('currentUser', ['$window', ($window: ng.IWindowService) => new CurrentUserManager($window) ]);
