/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../layout.module.ts" />
interface ITopNavScope extends ng.IScope {
    vm: AATopNavController;
}
class AATopNavController {
    constructor($scope: ITopNavScope) {
        $scope.vm = this;
        console.log('hola');
    }
}
appLayout.controller('aa-TopNavController',
    ['$scope', ($scope: ITopNavScope) =>
    new AATopNavController($scope)
]);
'use strict';
class AATopNav implements ng.IDirective {
      bindToController: boolean = true;
      controllerAs: string = 'vm';
      controller: AATopNavController;
      restrict: string = 'EA';
      scope: any = {
                'tagline': '=',
                'title':  '='
            };
     templateUrl: string = 'app/layout/aa-top-nav/aa-top-nav.html';
}
appLayout.directive('aaTopNav', [() => new AATopNav()]);
