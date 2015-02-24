/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />
var users = (function () {
    function users($scope, $http, $resource) {
        this.$scope = $scope;
        this.$http = $http;
        this.$resource = $resource;
        this.greeting = "Hello";
    }
    users.prototype.changeGreeting = function () {
        this.greeting = "Bye";
    };
    users.controllerId = function () {
        return 'users';
    };
    return users;
})();
// Update the app1 variable name to be that of your module variable
app_users.controller(users.controllerId(), ['$scope', '$http', '$resource', function ($scope, $http, $resource) { return new users($scope, $http, $resource); }]);
//# sourceMappingURL=users.js.map