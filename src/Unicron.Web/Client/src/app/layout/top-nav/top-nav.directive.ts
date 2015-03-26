/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../layout.module.ts" />
interface ITopNavScope extends ng.IScope {
    vm: TopNavController;
}
class TopNavController {
    constructor($scope: ITopNavScope) {
        $scope.vm = this;
    }
}
appLayout.controller('TopNavController',
    ['$scope', ($scope: ITopNavScope) =>
    new TopNavController($scope)
]);
'use strict';
class TopNav implements ng.IDirective {
      bindToController: boolean = true;
      controllerAs: string = 'vm';
      controller: TopNavController;
      restrict: string = 'EA';
      scope: any = {
                'tagline': '=',
                'title':  '='
            };
     templateUrl: string = 'app/layout/top-nav/top-nav.html';
}
appLayout.directive('TopNav', [() => new TopNav()]);
