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
    sum():  number;
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
        return 'users';
    }
    sum(): number {
        this.result = this.firstNumber + this.secondNumber;
        return this.result;
    }
}

// Update the app1 variable name to be that of your module variable
app_users.controller(Users.controllerId(), ['$scope', ($scope: IUsersScope) =>
    new Users($scope)
]);
