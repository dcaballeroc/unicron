/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/sinon/sinon.d.ts" />
/// <reference path="../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/* tslint:disable:typedef */

describe('app.module', () => {

    var $state: any;

    beforeEach(function() {
        module('app', function($provide: ng.auto.IProvideService) {
           $provide.value('$state', {
                go: sinon.spy()
            });
        });
        inject(function(_$state_: any) {
            $state = _$state_;
        });
    });

    it('Should route login on start', function() {
        chai.expect($state.go).to.have.been.calledWith('login');
    });
});
