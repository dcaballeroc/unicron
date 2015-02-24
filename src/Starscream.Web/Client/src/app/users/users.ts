/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />


interface IusersScope extends ng.IScope {
    vm: users;
}

interface Iusers {
    greeting: string;
  
    changeGreeting: () => void;
 
}

class users implements Iusers {
   
    greeting = "Hello";
    
    constructor(private $scope: IusersScope, private $http: ng.IHttpService, private $resource: ng.resource.IResourceService) {
    }

    changeGreeting() {
        this.greeting = "Bye";
    }

    static controllerId() {
        return 'users';
    }
}

// Update the app1 variable name to be that of your module variable
app_users.controller(users.controllerId(), ['$scope', '$http', '$resource', ($scope, $http, $resource) =>
    new users($scope, $http, $resource)
]);
