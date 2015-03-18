/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="exception.module.ts" />
/// <reference path="../logger/logger.service.ts" />
'use strict';

interface IConfigureExceptionHandlerProvider {
    appErrorPrefix: string;
}

interface IExceptionHandlerProvider {
    config(): void;
    configure(errorPrefix: string): void;
    $get(): IConfigureExceptionHandlerProvider;
}

class ExceptionHandlerProvider implements IExceptionHandlerProvider {
    appErrorPrefix: IConfigureExceptionHandlerProvider;
    config(): void {
         this.appErrorPrefix = undefined;
     }
    configure(errorPrefix: string): void {
        var _config: IConfigureExceptionHandlerProvider = {
            appErrorPrefix: errorPrefix
        };
        this.appErrorPrefix = _config;
    }
    $get(): IConfigureExceptionHandlerProvider {
        return this.appErrorPrefix;
    }
}

commonException.provider('exceptionHandler', ExceptionHandlerProvider).config(configure);

configure.$inject = ['$provide'];
function configure($provide: any): void {
        'use strict';
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];
/* @ngInject */
    function extendExceptionHandler($delegate: any, exceptionHandler: IExceptionHandlerProvider, logger: ILogger): any {
        'use strict';
        return function(exception: any, cause: any): void {
            var appErrorPrefix: string = exceptionHandler.$get().appErrorPrefix || '';
            var errorData: any = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            logger.error('', exception.message, errorData);
        };
    }
