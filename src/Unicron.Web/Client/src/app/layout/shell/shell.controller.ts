/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../layout.module.ts" />
/// <reference path="../../common/logger/logger.service.ts" />
/// <reference path="../../core/config.ts" />

interface IShellScope extends ng.IScope {
    vm: Shell;
}
interface ITagLine {
    text: string;
    link: string;
}
interface IShell {
    title: string;
    busyMessage: string;
    isBusy: boolean;
    showSplash: boolean;
    tagline: ITagLine;
    activate(): void;
    hideSplash(): void;
}

class Shell implements IShell {
    title: string;
    busyMessage: string;
    isBusy: boolean;
    showSplash: boolean;
    tagline: ITagLine;
    private $timeOut: ng.ITimeoutService;
    private config: Iconfig;
    private logger: ILogger;
    static $inject: any = ['$scope', '$timeout', 'config', 'logger'];
    /*@ngInject*/
    constructor($scope: IShellScope, $timeOut: ng.ITimeoutService, config: Iconfig, logger: ILogger) {
        $scope.vm = this;
        this.$timeOut = $timeOut;
        this.config = config;
        this.logger = logger;
        this.setValues();
        this.activate();
        console.log(this.title);
    }
    activate(): void {
        this.logger.success(config.appTitle, config.appTitle + ' loaded!', null);
        this.hideSplash();
    }
    hideSplash(): void {
       this.$timeOut(() => {
        this.showSplash = false ;
        }, 1000);
    }
    static controllerId(): string {
        return 'Shell';
    }
    private setValues(): void {
        this.busyMessage = 'Please wait...';
        this.isBusy = true;
        this.showSplash = true;
        this.tagline = {
            text : 'Created by Acklen/Avenue',
            link : 'www.acklenavenue.com'
        };
    }
}
// Update the app1 variable name to be that of your module variable
appLayout.controller('Shell',
    ['$scope', '$timeout', 'config', 'logger', ($scope: IShellScope, $timeOut: ng.ITimeoutService, config: Iconfig, logger: ILogger) =>
    new Shell($scope, $timeOut, config, logger)
]);
