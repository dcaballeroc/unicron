/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/core/current-user.factory.ts"/>
/// <reference path="../../../app/core/httpInterceptors/auth.service.ts"/>
/// <reference path="../../../app/core/httpInterceptors/log-http.service.ts"/>
/// <reference path="../../../app/common/logger/logger.service.ts"/>
/* tslint:disable:typedef */
describe('HttpInterceptors', () => {

    var $httpProvider: ng.IHttpProvider;
    var $httpBackend: ng.IHttpBackendService;
    var $http: ng.IHttpService;

    var userMock: ICurrentUser = {
        email : 'email',
        name : 'name',
        token : 'tokenXXX',
        expires : JSON.stringify(new Date())
    };

    beforeEach(angular.mock.module('app.core', function(_$httpProvider_: ng.IHttpProvider) {
        $httpProvider = _$httpProvider_;
    }));
    beforeEach(inject(function(_$httpBackend_: ng.IHttpBackendService,
                            _$http_: ng.IHttpService) {


        $httpBackend = _$httpBackend_;
        $http = _$http_;

    }));
    afterEach(function() {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Authorization Interceptor', () => {
        var currentUser: ICurrentUserManager;
        var authorizationService: AuthorizationService;
        var stubCurrentUser: any;
        beforeEach(inject(function( _authorizationService_: AuthorizationService, _currentUser_: ICurrentUserManager) {
            currentUser = _currentUser_;
            authorizationService = _authorizationService_;
            stubCurrentUser = sinon.stub(currentUser, 'GetUser', () => userMock);
        }));
        afterEach(function() {
              stubCurrentUser.restore();
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
   describe('Logger Interceptor', () => {
       var logHttpService: LogHttpService;
       var $q: ng.IQService;
       var logger: ILogger;
       var spyLogger: any;

       beforeEach(inject(function(_logHttpService_: LogHttpService, _$q_: ng.IQService, _logger_: ILogger) {
           logHttpService = _logHttpService_;
           $q = _$q_;
           logger = _logger_;
           spyLogger = sinon.spy(logger, 'error');
       }));
       afterEach(function() {
          spyLogger.restore();

       });

       it('Should have the logger http service be defined', function() {
           chai.expect(logHttpService).to.be.not.undefined;
       });
        it('Should loggerHttpService listed has http interceptor', function() {
            chai.expect($httpProvider.interceptors).to.contain('logHttpService');
        });
       it('Should log the response error', function() {
            var errorData: any = {
                name: 'Error test',
                origin: 'Test'
            };
            $httpBackend.whenGET('/testLog').respond(401, errorData);
            $http.get('/testLog', errorData);
            $httpBackend.flush();
           chai.expect(spyLogger).to.have.been.calledWith('Error on Response', 'Error 401 in GET URL = /testLog');
       });

    });

});
