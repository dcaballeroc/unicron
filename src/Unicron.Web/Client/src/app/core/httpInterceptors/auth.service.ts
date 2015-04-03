/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core.module.ts" />
class AuthorizationService {
    static $inject: any = ['$q', 'currentUser'];
    /*@ngInject*/
    constructor(private $q: ng.IQService, private currentUser: ICurrentUserManager ) {
    }
    request: any = (config: ng.IRequestConfig): any => {
        var user: ICurrentUser = this.currentUser.GetUser();
        if (user) {
            config.headers.Authorization = 'Bearer ' + user.token;
        }
        return config || this.$q.when(config);
    };
    requestError: any = (rejection: any): any => {
        return this.$q.reject(rejection);
    };
}
appCore.factory('authorizationService', ['$q', 'currentUser', ($q: ng.IQService, currentUser: ICurrentUserManager)
        => new AuthorizationService($q, currentUser)]);

appCore.config(['$httpProvider', function($httpProvider: ng.IHttpProvider): void {
    $httpProvider.interceptors.push('authorizationService');
}]);

