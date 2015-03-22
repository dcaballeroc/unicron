/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="router.module.ts" />
/* tslint:disable:member-ordering */
interface IRouterProviderConfig {
    docTitle: string;
    resolveAlways: any;
}

interface IStateCounts {
    errors: number;
    changes: number;
}
class RouterHelperProvider implements ng.IServiceProvider {
    static $inject: any = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    private $locationProvider: ng.ILocationProvider;
    private $stateProvider: angular.ui.IStateProvider;
    private $urlRouterProvider: angular.ui.IUrlRouterProvider;
    private config: IRouterProviderConfig;
    constructor($locationProvider: ng.ILocationProvider,
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            this.$locationProvider = $locationProvider;
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
    }
    configure(cfg: IRouterProviderConfig): void {
        this.config = cfg;
    }
    $get(): any {
       /* @ngInject */
        var routeHelper: any = ($location: ng.ILocationService,
                $rootScope: ng.IRootScopeService,
                $state: angular.ui.IStateService,
                logger: ILogger): any => {
            var handlingStateChangeError: boolean = false;
            var hasOtherwise: boolean = false;
            var stateCounts: IStateCounts = {errors : 0, changes : 0};
            var formatErrorMessage: any = (error: any, toState: any): string => {
                var dest: string = (toState && (toState.title || toState.name ||
                                                    toState.loadedTemplateUrl)) || 'unknown target';
                return 'Error routing to ' + dest + '. '
                    + error.message || error.data || ''
                    + '. <br/>' + (error.statusText || '')
                    + ': ' + (error.status || '');
            };
            var configureStates: any = (states: RouteSettings.IAcklenAvenueRoute[],
                    otherwisePath: string): void => {
                        states.forEach(() => (state: RouteSettings.IAcklenAvenueRoute): void => {
                                state.config.resolve =
                                    angular.extend(state.config.resolve || {}, this.config.resolveAlways);
                            this.$stateProvider.state(state.state, state.config);
                            if (otherwisePath && !hasOtherwise) {
                                    hasOtherwise = true;
                                    this.$urlRouterProvider.otherwise(otherwisePath);
                            }
                        });
            };
            var handleRoutingErrors: any = (): void => {
                    $rootScope.$on('$stateChangeError', () => (
                        event: any, toState: any, toParams: any,
                        fromState: any, fromParams: any, error: any) : void => {
                             if (handlingStateChangeError) {
                                return;
                            }
                            stateCounts.errors++;
                            handlingStateChangeError = true;
                            var msg: string = formatErrorMessage(error, toState);
                            logger.warning('Route Error', msg, [toState]);
                            $location.path('/');
                        }
                    );
            };
            var updateDocTitle: any = (): void => {
                     $rootScope.$on('$stateChangeSuccess', () => (
                        event: any, toState: any, toParams: any, fromState: any, fromParams: any): void => {
                            stateCounts.changes++;
                            handlingStateChangeError = false;
                            var title: string = this.config.docTitle + ' ' + (toState.title || '');
                            angular.extend($rootScope, title);
                        }
                    );
            };
            var getStates: any = (): any => {
                return $state.get();
            };
            var init: any = (): void => {
                handleRoutingErrors();
                updateDocTitle();
            };
            init();
            return {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };
        };
       return routeHelper();
    }
}
commonRouter.provider('routeHelper', RouterHelperProvider);
