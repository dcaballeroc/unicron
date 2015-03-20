
/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../app/users/users.controller.ts"/>
/* tslint:disable:typedef */
/**
 * Module dependencies.
 */


/**
 * Globals
 */

var expect: any = chai.expect;
describe('Users', () => {
    var controller: IUsers;
    var scope: IUsersScope;
    beforeEach(angular.mock.module('app.users'));
    beforeEach(angular.mock.inject(function($controller: ng.IControllerService, $rootScope: ng.IRootScopeService) {
                scope = <IUsersScope>$rootScope.$new();
                controller = $controller('users.controller', {$scope: scope});
            }
        )
    );
    it('should be able to add 2 plus 2', function () {
        controller.firstNumber = 2;
        controller.secondNumber = 2;
        controller.sum();
        expect(controller.result).to.equal(4);
        });
});
