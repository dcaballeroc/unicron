/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/common/exception/exception-handler.service.ts"/>
/* tslint:disable:typedef */
var expect: any = chai.expect;

describe('$exceptionHandler', () => {
    
    
    it('should be defined', inject(function($exceptionHandler) {
        expect($exceptionHandler).to.be.defined;
        
    }));
     it('should have configuration', inject(function($exceptionHandler) {
        expect($exceptionHandler).to.be.defined;
        
    }));
    
});
