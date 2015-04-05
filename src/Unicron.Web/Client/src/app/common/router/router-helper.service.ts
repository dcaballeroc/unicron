/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="router.module.ts" />
/* tslint:disable */
(function() {
    'use strict';

    angular
        .module('common.router')
        .provider('routeHelper', routerHelperProvider);
    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider: any, $stateProvider: any, $urlRouterProvider: any) {
        var config: any = {
            docTitle: undefined,
            resolveAlways: {}
        };

        this.configure = function(cfg: any) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
        /* @ngInject */
        function RouterHelper($location: any, $rootScope: any, $state: any, logger: any) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states: any, otherwisePath: any) {
                states.forEach(function(state: any) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event: any, toState: any, toParams: any, fromState: any, fromParams: any, error: any) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        console.log(error);
                        handlingStateChangeError = true;
                        var msg = formatErrorMessage(error);
                        logger.warning(msg, [toState]);
                        $location.path('/');

                        function formatErrorMessage(error: any) {
                            var dest = (toState && (toState.title || toState.name ||
                                                    toState.loadedTemplateUrl)) || 'unknown target';
                            return 'Error routing to ' + dest + '. ' +
                                error.message || error.data || '' +
                                '. <br/>' + (error.statusText || '') +
                                ': ' + (error.status || '');
                        }
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event: any, toState: any, toParams: any, fromState: any, fromParams: any) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }
})();
