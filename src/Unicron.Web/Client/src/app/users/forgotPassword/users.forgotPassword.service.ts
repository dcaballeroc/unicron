/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../users.module.ts" />
interface IUserForgotPasswordRequest {
    email: string;
}
interface IUserForgotPasswordService {
    ResetPassword(email: string): ng.IPromise<boolean>;
};
class UserForgotPasswordService implements IUserForgotPasswordService {

    static $inject: any = ['httpq'];

    constructor (private httpq: IHttpQ) {
    }
    ResetPassword(email: string): ng.IPromise<boolean> {
        var request: IUserForgotPasswordRequest = {
            email: email
        };
        return this.httpq.Post<IUserForgotPasswordRequest, boolean>('/password/reset/', request);
    }
}

appUsers.service('forgotPasswordservice', UserForgotPasswordService);
