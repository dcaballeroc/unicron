/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/common/httpq/httpQ.service.ts"/>

/* tslint:disable:typedef */
var expect: any = chai.expect;
interface IDataMock {
    name: string;
}
describe('httpq', () => {
    var $httpBackend: ng.IHttpBackendService;
    var $q: ng.IQService;
    var httpq: HttpQ;
    var dataMock: IDataMock = {
        name: 'mocked'
    };
    beforeEach(angular.mock.module('app.core'));
    beforeEach(inject(function(_$httpBackend_: ng.IHttpBackendService
                                , _$q_: ng.IQService
                                , _httpq_: HttpQ
                               ) {
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        
        httpq = _httpq_;
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    describe('GET', () => {
        it('Promise should be defined', function() {

            $httpBackend.whenGET('/test').respond(() => dataMock);
            var promise = httpq.get<IDataMock>('/test');
            $httpBackend.flush();
            expect(promise).to.be.defined;
        });
        it('Get Should return correct data on success', function() {
            $httpBackend.whenGET('/test').respond(dataMock);
            var response: IDataMock;
            var promise = httpq.get<IDataMock>('/test');
            promise.then(function(data: IDataMock) {
                response = data;
            });
            $httpBackend.flush();
            expect(response.name).to.be.equal(dataMock.name);
        });
        it('Get Should reject the promise and respond with error', function() {
            $httpBackend.whenGET('/test').respond(401, 'error');
            var promise = httpq.get<IDataMock>('/test');
            var result: any;
            promise.then(function(data: IDataMock) {
                result = data;
            }, function(error) {
                result = error;
            });
            $httpBackend.flush();
            console.log(result);
            expect(result).to.be.equal('error');
        });
   });
   
    
});

