/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../app/layout/sidebar/aa-sidebar-directive.ts"/>
/* tslint:disable:typedef */

describe('aaSidebar directive ', () => {
    var dropdownElement: any;
    var e1: any;
    var innerElement: any;
    var isOpenClass = 'dropy';
    var $compile: ng.ICompileService;
    var $rootScope: ng.IRootScopeService;
    
    beforeEach(module('app.layout'));
    beforeEach(inject(function(_$compile_: ng.ICompileService, _$rootScope_: ng.IRootScopeService) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        e1 = angular.element('<aa-sidebar when-done-animating="vm.sidebarReady(42)" > \
                <div class="sidebar-dropdown"><a href="">Menu</a></div> \
                <div class="sidebar-inner" style="display: none"></div> \
            </aa-sidebar>');
        dropdownElement = e1.find('.sidebar-dropdown a');
        innerElement = e1.find('.sidebar-inner');
        $compile(e1)($rootScope);
        $rootScope.$digest();
    }));
    describe('the isOpenClass', () => {
        it('is absent for a closed menu', function () {
            hasIsOpenClass(false);
        });
        it('is added to a closed menu after clicking', function () {
            clickIt();
            hasIsOpenClass(true);
        });
    });
    function hasIsOpenClass(isTrue: boolean): void {
        var hasClass = dropdownElement.hasClass(isOpenClass);
        chai.expect(hasClass).equal(!!isTrue,
            'dropdown has the "is open" class is ' + hasClass);
    }
    function clickIt(): void {
        dropdownElement.trigger('click');
    }
    
});
