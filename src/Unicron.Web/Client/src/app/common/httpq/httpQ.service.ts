/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../app/core/core.module.ts" />
class HttpQ {
    static $inject: any = ['$http', '$q'];
    /*@ngInject*/
   constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
   }
   get<T>(resource: string): ng.IPromise<T> {
        var defer: ng.IDeferred<T> = this.$q.defer();
        this.$http.get<T>(resource)
            .success(function(data: T): void {
                defer.resolve(data);
            })
            .error(function(error: T): void {
               defer.reject(error);
            });
        return defer.promise;
    }
}
appCore.factory('httpq', ['$http', '$q', ($http: ng.IHttpService, $q: ng.IQService) =>
           new HttpQ($http, $q)]);
