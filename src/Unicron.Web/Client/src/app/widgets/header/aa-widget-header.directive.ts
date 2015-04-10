/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../widgets.module.ts" />
'use strict';
class AAWidgetHeader implements ng.IDirective {
         scope: any = {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            };
            templateUrl: string = 'app/widgets/header/widget-header.html';
            restrict: string = 'EA';
}
appWidget.directive('aaWidgetHeader', [() => new AAWidgetHeader()]);

