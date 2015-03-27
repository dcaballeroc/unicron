/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
/// <reference path="core.module.ts" />
/* tslint:disable:typedef */
'use strict';
 var core = angular.module('app.core');

core.config(toastrConfig);

toastrConfig.$inject = ['toastr'];
    /* @ngInject */
function toastrConfig(toastr: Toastr) {
        'use strict';
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
}

interface Iconfig {
    appErrorPrefix: string;
    appTitle: string;
    imageBasePath: string;
    version: string;
}
var config: Iconfig = {
    appErrorPrefix: '[A/A Error] ', // Configure the exceptionHandler decorator
    appTitle: 'Unicron: ',
    version: '1.0.0',
    imageBasePath: '' // NOT YET USED
};

core.value('config', config);
core.config(configureRouterAndException);

configureRouterAndException.$inject = ['$compileProvider', '$logProvider',
                         'routeHelperProvider', 'exceptionHandlerProvider'];
/* @ngInject */
function configureRouterAndException ($compileProvider: ng.ICompileProvider, $logProvider: ng.ILogProvider,
                         routerHelperProvider: any , exceptionHandlerProvider: any) {
        'use strict';
    $compileProvider.debugInfoEnabled(false);
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.$get().getConfig().configure(config.appErrorPrefix);
    configureStateHelper();
    function configureStateHelper() {
        'use strict';
         routerHelperProvider.configure({
                docTitle: 'A/A Unicron',
                resolveAlways: {}
            });
    }
}
