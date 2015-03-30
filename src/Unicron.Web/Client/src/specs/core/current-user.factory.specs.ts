/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../app/core/current-user.factory.ts"/>

/* tslint:disable:typedef */

describe('current-user factory', () => {
    var spyLocalStorage: any;
    var spySessionStorage: any;
    var currentUserManager: ICurrentUserManager;
    beforeEach(function() {
       spyLocalStorage = sinon.spy(localStorage, 'setItem');
       spySessionStorage = sinon.spy(sessionStorage, 'setItem');
    });
    beforeEach(angular.mock.module('app.core'));
    beforeEach(inject(function(_currentUser_) {
        currentUserManager = _currentUser_;
    }));
    afterEach(function() {
        spyLocalStorage.restore();
        spySessionStorage.restore();
    });
    it('should save the user on local storage', () => {
        var testDate = new Date();
        currentUserManager.SetUserLocal('email', 'name', 'token', testDate);
        chai.expect(spyLocalStorage).to.have.been.called;
    });
    it('should save the user on session storage', () => {
         var testDate = new Date();
        currentUserManager.SetUserOnSession('email', 'name', 'token', testDate);
        chai.expect(spySessionStorage).to.have.been.called;
    });
    
});
