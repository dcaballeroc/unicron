/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/layout/sidebar/sidebar.controller.ts"/>

/* tslint:disable:typedef */
var expect: any = chai.expect;

describe('Sidebar', () => {
    var controller: ISidebar;
    var scope: ISidebarScope;
    var $state: angular.ui.IStateService;
    var $location: ng.ILocationService;
    var routeHelper: any;
    var $rootScope: ng.IRootScopeService;
    
    beforeEach(angular.mock.module('app.layout'));
    beforeEach(inject(function($controller: ng.IControllerService,
                _$rootScope_: ng.IRootScopeService,
                _$state_: angular.ui.IStateService,
                _$location_: ng.ILocationService,
                _routeHelper_: any, _$httpBackend_: ng.IHttpBackendService) {
                    scope = <ISidebarScope>_$rootScope_.$new();
                    $rootScope = _$rootScope_;
                    routeHelper = _routeHelper_;
                    routeHelper.configureStates(getMockStates(), '/');
                    controller = $controller('Sidebar', {$scope: scope, $tate: _$state_, routeHelper: _routeHelper_ });
                    $state = _$state_;
                    $location = _$location_;
                    $rootScope.$apply();
        
            }
        )
    );
    beforeEach(inject(function($templateCache) {
        $templateCache.put('app/users/users.html', '');
    }));
   it('should have isCurrent() for /users to return `current`', function() {
       $location.path('/users');
       $rootScope.$apply();
       expect(controller.isCurrent($state.current)).to.equal('current');
   });
    
     function getMockStates(): any {
        return [
            {
                state: 'users',
                config: {
                    url: '/users',
                    templateUrl: 'app/users/users.html',
                    controller: 'users.controller',
                    controllerAs: 'vm',
                    title: 'users',
                    settings: {
                            nav: 1,
                            content: '<i></i> Dashboard'
                        }
                }
            }
        ];
    }
});
