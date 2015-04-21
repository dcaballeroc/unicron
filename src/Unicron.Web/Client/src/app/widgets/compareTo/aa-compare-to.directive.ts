/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../widgets.module.ts" />

'use strict';
class AACompareTo implements ng.IDirective {
    require: string =  'ngModel';
    scope: any = {
        otherModelValue: '=compareTo'
    };
    restric: string = 'AE';
    link: ng.IDirectiveLinkFn = (scope: ng.IScope, element: ng.IAugmentedJQuery,
                                attrs: ng.IAttributes, ngModel: any) => {


    };
}
appWidget.directive('aaCompareTo', [() => new AACompareTo()]);
