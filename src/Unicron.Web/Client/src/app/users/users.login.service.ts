/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />
interface IUserLoginRequest {
   email: string;
   password: string;
}
interface IUserResponse {
    name: string;
    token: string;
    expires: string;
}
interface ILoginUsersService {
    Login(email: string, password: string): ng.IPromise<IUserResponse>;
}

class LoginUsersService implements ILoginUsersService {

    static $inject: any = ['httpq'];
    constructor(private httpq: IHttpQ) {
    }
    Login(email: string, password: string): ng.IPromise<IUserResponse> {
        return undefined;
    }
}
appUsers.factory('loginUsersService', ['httpq', (httpq: IHttpQ) => new LoginUsersService(httpq)]);

