/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../users.module.ts" />
interface IUserLoginRequest {
   email: string;
   password: string;
}
interface IUserResponse {
    name: string;
    token: string;
    expires: string;
    claims?: string [];
}
interface ILoginUsersService {
    Login(email: string, password: string): ng.IPromise<IUserResponse>;
}

class LoginUsersService implements ILoginUsersService {

    static $inject: any = ['httpq'];
    /*@ngInject*/
    constructor(private httpq: IHttpQ) {
    }
    Login(email: string, password: string): ng.IPromise<IUserResponse> {
        var request: IUserLoginRequest = {
            email: email,
            password: password
        };
        var response: ng.IPromise<IUserResponse> = this.httpq.Post<IUserLoginRequest, IUserResponse>('/login', request);
        return response;
    }
}
appUsers.factory('loginUsersService', ['httpq', (httpq: IHttpQ) => new LoginUsersService(httpq)]);

