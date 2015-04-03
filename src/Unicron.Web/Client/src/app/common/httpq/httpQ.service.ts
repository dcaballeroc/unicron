/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../app/core/core.module.ts" />
interface IHttpQ {
    Get<T>(resource: string): ng.IPromise<T>;
    Post<T>(resource: string, payload: T): ng.IPromise<T>;
    Put<T>(resource: string, payload: T): ng.IPromise<T>;
}
class HttpQ implements IHttpQ {
    static $inject: any = ['$http', '$q'];
    /*@ngInject*/
   constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
   }
   Get<T>(resource: string): ng.IPromise<T> {
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
    Post<T>(resource: string, payload: T): ng.IPromise<T> {
         var defer: ng.IDeferred<T> = this.$q.defer();
         this.$http.post<T>(resource, payload)
            .success(function(data: any): void {
                defer.resolve(data);
            })
            .error(function(error: any): void {
                defer.reject(error);
        });
        return defer.promise;
    }
    Put<T>(resource: string, payload: T): ng.IPromise<T> {
         var defer: ng.IDeferred<T> = this.$q.defer();
         this.$http.put<T>(resource, payload)
            .success(function(data: any): void {
                defer.resolve(data);
            })
            .error(function(error: any): void {
                defer.reject(error);
        });
        return defer.promise;
    }
}
appCore.factory('httpq', ['$http', '$q', ($http: ng.IHttpService, $q: ng.IQService) =>
           new HttpQ($http, $q)]);
