/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="core.module.ts" />
interface ICurrentUser {
    email: string;
    name: string;
    token: string;
    expires: string
}
interface ICurrentUserManager {
    GetUser(): ICurrentUser;
    SetUserLocal (email: string, name: string,  token: string, expires: Date): void;
    SetUserOnSession (email: string, name: string,  token: string, expires: Date): void;
    RemoveUser(): void;
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
        var userFromLocalStorage: string = this.$window.localStorage.getItem(this.windowsKey);
        var user: ICurrentUser;
        if (userFromLocalStorage) {
            user = <ICurrentUser>JSON.parse(userFromLocalStorage);
        } else {
            var userFromSessionStorage: string = this.$window.sessionStorage.getItem(this.windowsKey);
            if (!userFromSessionStorage) {
                return undefined;
            }
            user = <ICurrentUser>JSON.parse(userFromSessionStorage);
        }
        var expires: Date = new Date(JSON.parse(user.expires));
        if (expires < new Date()) {
            this.RemoveUser();
            return undefined;
        }
        return user;
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
            expires : JSON.stringify(expires)
        };
    }
     SetUserOnSession(email: string, name: string, token: string, expires: Date): void {
         this.SetUser(email, name, token, expires);
         var userString: string = JSON.stringify(this.currentUser);
         this.$window.sessionStorage.setItem(this.windowsKey, userString);
     }
    RemoveUser(): void {
        this.$window.sessionStorage.removeItem(this.windowsKey);
        this.$window.localStorage.removeItem(this.windowsKey);
    }
}

appCore.factory('currentUser', ['$window', ($window: ng.IWindowService) => new CurrentUserManager($window) ]);
