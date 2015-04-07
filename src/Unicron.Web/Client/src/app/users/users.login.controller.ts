/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../common/logger/logger.service.ts" />

interface IUsersLoginScope extends ng.IScope {
    vm: UsersLogin;
}

interface IUsersLogin {

    email: string;
    password: string;
    rememberMe: boolean;
    login(): void;
}

class UsersLogin implements IUsersLogin {

    email: string;
    password: string;
    rememberMe: boolean;
    static $inject: any = ['$scope', 'logger', 'loginUsersService', 'currentUser'];
    /*@ngInject*/
    constructor($scope: IUsersLoginScope, private logger: ILogger, private loginUserService: ILoginUsersService,
                private currentUser: ICurrentUserManager) {
        $scope.vm = this;
    }
    static controllerId(): string {
        return 'users.login.controller';
    }
    login(): void {
        this.loginUserService.Login(this.email, this.password).then((data: IUserResponse) =>  {
            this.SaveUser(data);
        }).catch((error: any) => {
            this.logger.error('Error', error, null);
        });
    }
    private SaveUser(data: IUserResponse): void {
        var expireDate: Date = new Date(Date.parse(data.expires));
        if (this.rememberMe) {
            this.currentUser.SetUserLocal(this.email, data.name, data.token, expireDate);
        } else {
            this.currentUser.SetUserOnSession(this.email, data.name, data.token, expireDate);
        }
    }
}

// Update the app1 variable name to be that of your module variable
appUsers.controller(UsersLogin.controllerId(),
        ['$scope', 'logger', 'loginUsersService', 'currentUser',
            ($scope: IUsersLoginScope, logger: ILogger, loginUserService: ILoginUsersService, currentUser: ICurrentUserManager) =>
    new UsersLogin($scope, logger, loginUserService, currentUser)
]);
