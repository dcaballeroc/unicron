/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="users.module.ts" />
var Users = (function () {
    function Users($scope) {
        $scope.vm = this;
    }
    Users.controllerId = function () {
        return 'users';
    };
    Users.prototype.sum = function () {
        this.result = this.firstNumber * this.secondNumber;
        return this.result;
    };
    Users.$inject = ['$scope'];
    return Users;
})();
// Update the app1 variable name to be that of your module variable
app_users.controller(Users.controllerId(), ['$scope', function ($scope) { return new Users($scope); }]);
//# sourceMappingURL=users.js.map