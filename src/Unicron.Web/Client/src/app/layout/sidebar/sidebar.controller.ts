/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../layout.module.ts" />
/// <reference path="../../common/logger/logger.service.ts" />
/// <reference path="../../core/config.ts" />

interface ISidebarScope extends ng.IScope {
    vm: Sidebar;
}

interface ISidebar {
    activate(): void;
    isCurrent(route: any): any;
}

class Sidebar implements ISidebar {
    $scope: ISidebarScope;
    $state: IStateService;
    routeHelper: any;
    private navRoutes: any;
    private states: any;
    static $inject: any = ['$scope', '$state', 'routeHelper'];
    constructor($scope: ISidebarScope, $state: angular.ui.IStateService, routeHelper: any) {
        $scope.vm = this;
        this.$scope = $scope;
        this.$state = $state;
        this.routeHelper = routeHelper;
        this.states = routeHelper.getStates();
        this.activate();
    }
     getNavRoutes(): void {
         console.log(this.states);
     this.navRoutes = this.states.filter(function(r: any): any {
            return r.settings && r.settings.nav && r.settings.showInMenu;
         }).sort(function(r1: any, r2: any): any {
             return r1.settings.nav - r2.settings.nav;
         });
    }
    activate(): void {
       this.getNavRoutes();
    }
    isCurrent(route: any): any {
        if (!route.title || !this.$state.current || !this.$state.current.title) {
                return '';
        }
        var menuName: string = route.title;
        return this.$state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
}
// Update the app1 variable name to be that of your module variable
appLayout.controller('Sidebar',
    ['$scope', '$state', 'routeHelper', ($scope: ISidebarScope, $state: angular.ui.IStateService, routeHelper: any) =>
    new Sidebar($scope, $state, routeHelper)
]);


