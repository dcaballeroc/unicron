/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/* tslint:disable:typedef */
/**
 * Module dependencies.
 */
import chai = require('chai');

/**
 * Globals
 */

var expect: any = chai.expect;
describe('Users', () => {
    var controller: IUsers;
    var scope: IUsersScope;
    beforeEach(angular.mock.module('app_users'));
    beforeEach(angular.mock.inject(function($controller: ng.IControllerService, $rootScope: ng.IRootScopeService) {
            scope = <IUsersScope>$rootScope.$new();
            controller = $controller('users', {$scope: scope});
        }
        )
    );
    it('should be able to add 2 plus 2', function () {
        controller.firstNumber = 2;
        controller.secondNumber = 2;
        expect(controller.result).to.equal(4);
        });
});
