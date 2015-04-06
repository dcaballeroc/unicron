/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../app/users/users.login.service.ts"/>
/// <reference path="../../app/common/httpq/httpQ.service.ts"/>
/* tslint:disable:typedef */

describe('User Login Service', () => {
    var $httpBackend: ng.IHttpBackendService;
    var userResponse: IUserResponse = {
        name: 'User Test',
        token: 'User Token',
        expires: 'Expire Time'
    };
    var loginService: ILoginUsersService;
    beforeEach(module('app.users'));
    beforeEach(inject(function(_$httpBackend_: ng.IHttpBackendService,
        _loginUsersService_: ILoginUsersService) {
      $httpBackend = _$httpBackend_;
        loginService = _loginUsersService_;
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return user data', () => {
        var userLoginRequest: IUserLoginRequest = {
            email: 'test@test.com',
            password: 'test'
        };
        $httpBackend.whenPOST('/login', userLoginRequest).respond(userResponse);
        $httpBackend.flush();
    });
});
