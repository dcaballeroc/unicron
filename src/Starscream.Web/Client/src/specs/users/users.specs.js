/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../app/users/users.ts"/>
/* tslint:disable:typedef */
/**
 * Module dependencies.
 */
/**
 * Globals
 */
var expect = chai.expect;
describe('Users', function () {
    var controller;
    var scope;
    beforeEach(angular.mock.module('app_users'));
    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('users', { $scope: scope });
    }));
    it('should be able to add 2 plus 2', function () {
        controller.firstNumber = 2;
        controller.secondNumber = 2;
        controller.sum();
        expect(controller.result).to.equal(4);
    });
});

//# sourceMappingURL=../../build/users/users.specs.js.map