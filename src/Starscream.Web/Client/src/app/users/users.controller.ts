/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />


interface IUsersScope extends ng.IScope {
    vm: Users;
}

interface IUsers {

    firstNumber: number;
    secondNumber: number;
    result: number;
    sum():  void;
}

class Users implements IUsers {

    firstNumber: number;
    secondNumber: number;
    result: number;
    static $inject: any = ['$scope'];
    constructor( $scope: IUsersScope) {
        $scope.vm = this;
    }
    static controllerId(): string {
        return 'users.controller';
    }
    sum(): void {
        this.result = this.firstNumber + this.secondNumber;
    }
}

// Update the app1 variable name to be that of your module variable
appUsers.controller(Users.controllerId(), ['$scope', ($scope: IUsersScope) =>
    new Users($scope)
]);
