/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core.module.ts" />
class LogHttpService {
    static $inject: any = ['$q', 'logger'];
    /*@ngInject*/
    constructor(private $q: ng.IQService, private logger: ILogger) {
    }
    responseError: any = (rejection: any): any =>  {
        this.logError(rejection);
        return this.$q.reject(rejection);
    };
    private logError(rejection: any): void {
         var errorData: any = {
            method: rejection.config.method,
            url: rejection.config.url,
            data: rejection.data,
            headers: rejection.config.headers,
            status: rejection.status,
            statusText: rejection.statusText
        };
       this.logger.error('Error on Response', 'Error '
        + errorData.status + ' in ' + errorData.method + ' URL = ' + errorData.url , errorData);
    }
}
appCore.factory('logHttpService', ['$q', 'logger', ($q: ng.IQService, logger: ILogger)
        => new LogHttpService($q, logger)]);

appCore.config(['$httpProvider', function($httpProvider: ng.IHttpProvider): void {
    $httpProvider.interceptors.push('logHttpService');
}]);
