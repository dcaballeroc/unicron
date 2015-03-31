/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/core/current-user.factory.ts"/>
/// <reference path="../../../app/core/httpInterceptors/auth.service.ts"/>

/* tslint:disable:typedef */
describe('HttpInterceptors', () => {
    var currentUser: ICurrentUserManager;
    var authorizationService: AuthorizationService;
    var $httpProvider: ng.IHttpProvider;
    var $httpBackend: ng.IHttpBackendService;
    var $http: ng.IHttpService;
    var stubCurrentUser: any;
    var userMock: ICurrentUser = {
        email : 'email',
        name : 'name',
        token : 'tokenXXX',
        expires : JSON.stringify(new Date())
    };
    
    beforeEach(angular.mock.module('app.core', function(_$httpProvider_: ng.IHttpProvider) {
        $httpProvider = _$httpProvider_;
    }));
    beforeEach(inject(function(_currentUser_: ICurrentUserManager,
                            _authorizationService_: AuthorizationService,
                            _$httpBackend_: ng.IHttpBackendService,
                            _$http_: ng.IHttpService) {
        currentUser = _currentUser_;
        authorizationService = _authorizationService_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        stubCurrentUser = sinon.stub(currentUser, 'GetUser', () => userMock);
    }));
    afterEach(function() {
        stubCurrentUser.restore();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
   
    it('Should have the authorization service be defined', function() {
        chai.expect(authorizationService).to.be.not.undefined;
    });
    it('Should authorizationService listed has http interceptor', function() {
        chai.expect($httpProvider.interceptors).to.contain('authorizationService');
    });
    it('Should set the token in the headers', function() {
    
        $httpBackend.whenGET('/test', function(headers: any) {
            return headers.Authorization === 'Bearer ' + userMock.token;
        }).respond(' ');
        $http.get('/test');
        $httpBackend.flush();
    });
    
});
