/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../layout.module.ts" />

'use strict';
class AATopNav implements ng.IDirective {
      bindToController: boolean = true;
      controllerAs: string = 'vm';
      controller: string = 'aa-TopNavController';
      restrict: string = 'EA';
      scope: any = {
                title:  '='
            };
     templateUrl: string = 'app/layout/aa-top-nav/aa-top-nav.html';
}
appLayout.directive('aaTopNav', [() => new AATopNav()]);
