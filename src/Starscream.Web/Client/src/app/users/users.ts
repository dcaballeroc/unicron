/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />


interface IusersScope extends ng.IScope {
    vm: users;
}

interface Iusers {

    firstNumber: number;
    secondNumber: number;
    result: number;
    sum():  number;
 
}

class users implements Iusers {
 
    
    constructor(private $scope: IusersScope, private $http: ng.IHttpService, private $resource: ng.resource.IResourceService) {
    }

  
    firstNumber: number;
    secondNumber: number;
    result: number;
    static controllerId() {
        return 'users';
    }

    sum() {
        this.result = this.firstNumber + this.secondNumber;
        return this.result;
    }
}

// Update the app1 variable name to be that of your module variable
app_users.controller(users.controllerId(), ['$scope', '$http', '$resource', ($scope, $http, $resource) =>
    new users($scope, $http, $resource)
]);
