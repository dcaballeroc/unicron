/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../core.module.ts" />
class AuthorizationService {
    static $inject: any = ['$q', 'currentUser'];
    /*@ngInject*/
    constructor(private $q: ng.IQService, private currentUser: ICurrentUserManager,
            private $injector: ng.auto.IInjectorService) {
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
    responseError: any = (rejection: any): any => {
        if (rejection.status === 401) {
            var $state: any = this.$injector.get('$state');
            console.log('Testing');
            console.log($state);
            $state.transitionTo('login');
        }
        return this.$q.reject(rejection);
    };
}
appCore.factory('authorizationService', ['$q', 'currentUser', '$injector',
    ($q: ng.IQService, currentUser: ICurrentUserManager, $injector: ng.auto.IInjectorService)
        => new AuthorizationService($q, currentUser, $injector)]);

appCore.config(['$httpProvider', function($httpProvider: ng.IHttpProvider): void {
    $httpProvider.interceptors.push('authorizationService');
}]);

