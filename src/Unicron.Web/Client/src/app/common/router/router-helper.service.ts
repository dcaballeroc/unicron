/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="router.module.ts" />
class RouterProviderConfig {
    docTitle: string;
    resolveAlways: any;
}

class RouterHelperProvider implements ng.IServiceProvider {
    config: {
        docTitle: string;
        resolveAlways: {}
    };
    routeHelper: RouteHelper;
    static $inject: any = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    constructor(
        $locationProvider: ng.ILocationProvider,
        $stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $locationProvider.html5Mode(true);
    }
    configure(cfg: any): void {
        this.config.docTitle = cfg.docTitle;
        this.config.resolveAlways = cfg.resolveAlways;
    }
    $get(): any {
        return () => this.routeHelper;
    }
}
commonRouter.provider('routerHelper', RouterHelperProvider);

interface IStateCounts {
    errors: number;
    changes: number;
}
class RouteHelper {
    handlingStateChangeError: boolean = false;
    hasOtherwise: boolean = false;
    stateCounts: IStateCounts = {errors : 0, changes : 0};
    static $inject: any = ['$location', '$rootScope', '$state', 'logger'];
    constructor(
        $location: ng.ILocationProvider,
        $rootScope: ng.IRootScopeService,
        $state: angular.ui.IStateProvider,
        logger: ILogger) {}
}

