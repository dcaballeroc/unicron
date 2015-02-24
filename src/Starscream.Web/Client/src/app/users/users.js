/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />
var users = (function () {
    function users($scope, $http, $resource) {
        this.$scope = $scope;
        this.$http = $http;
        this.$resource = $resource;
    }
    users.controllerId = function () {
        return 'users';
    };
    users.prototype.sum = function () {
        this.result = this.firstNumber + this.secondNumber;
        return this.result;
    };
    return users;
})();
// Update the app1 variable name to be that of your module variable
app_users.controller(users.controllerId(), ['$scope', '$http', '$resource', function ($scope, $http, $resource) { return new users($scope, $http, $resource); }]);
//# sourceMappingURL=users.js.map