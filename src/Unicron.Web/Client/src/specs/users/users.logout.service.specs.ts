/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../app/users/users.logout.service.ts"/>
/// <reference path="../../app/core/current-user.factory.ts"/>
/* tslint:disable:typedef */

describe('users.logout.service', () => {
    var userLogoutService: IUserLogoutService;
    var currentUser: ICurrentUserManager;
    beforeEach(module('app.users'));

    beforeEach(inject(function(_currentUser_: ICurrentUserManager, _userLogoutService_: IUserLogoutService) {
        currentUser = _currentUser_;
        currentUser.RemoveUser = sinon.spy();
        userLogoutService = _userLogoutService_;
    }));
    it('Should remove user from session and local storage', function() {
        userLogoutService.Logout();
        chai.expect(currentUser.RemoveUser).has.been.called;
    });

});
