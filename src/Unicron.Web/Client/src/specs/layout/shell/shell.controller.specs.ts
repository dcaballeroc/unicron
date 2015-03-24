/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/layout/shell/shell.controller.ts"/>

/* tslint:disable:typedef */
var expect: any = chai.expect;

describe('Shell', () => {
    var controller: IShell;
    var scope: IShellScope;
    var $timeout: ng.ITimeoutService;
    beforeEach(angular.mock.module('app.layout'));
    beforeEach(inject(function($controller: ng.IControllerService,
        $rootScope: ng.IRootScopeService, _$timeout_: ng.ITimeoutService) {
                scope = <IShellScope>$rootScope.$new();
                controller = $controller('shell.controller', {$scope: scope});
                $timeout = _$timeout_;
            }
        )
    );
    describe('Shell Controller', () => {
        it('should be created successfully', function() {
          expect(controller).to.be.defined;
        });
        it('should show splash screen', function() {
          expect(controller.showSplash).to.be.true;
        });
         it('should hide splash screen after timeout', function(done) {
             $timeout(() => {
                 expect(controller.showSplash).to.be.false;
                 done();
                 }, 1000);
             $timeout.flush();
        });
    });
});
