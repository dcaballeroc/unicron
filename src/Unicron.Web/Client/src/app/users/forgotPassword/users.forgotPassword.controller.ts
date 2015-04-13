/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../common/logger/logger.service.ts" />
/// <reference path="../../common/logger/logger.service.ts" />

interface IUserForgotPasswordScope extends ng.IScope {
    vm: UserForgotPassword;
}

interface IUserForgotPassword {
    email: string;
    success: boolean;
    ResetPassword():  void;
    ShowModal(): any;
}

class UserForgotPassword implements IUserForgotPassword {

    email: string;
    success: boolean;
    static $inject: any = ['$scope', 'logger', 'forgotPasswordservice', '$modal'];
    /*@ngInject*/
    constructor( private $scope: IUserForgotPasswordScope, private logger: ILogger,
            private userForgotPasswordService: IUserForgotPasswordService, private $modal: any) {
        $scope.vm = this;
    }
    static controllerId(): string {
        return 'user.forgotPassword.controller';
    }
    ResetPassword(): void {
        this.userForgotPasswordService.ResetPassword(this.email)
            .then( (data: any) => {
                this.success = true;
            });
    }
    ShowModal(): any {
        var modal: any = {
                title: 'Title',
                content: 'Hello Modal<br/> This is a multiline message!',
                backdrop: true
            };
        return modal;
    }
}
// Update the app1 variable name to be that of your module variable
appUsers.controller(UserForgotPassword.controllerId(), UserForgotPassword);
