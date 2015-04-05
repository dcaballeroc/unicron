/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../layout.module.ts" />
'use strict';
class AASidebar implements ng.IDirective {
    bindToController: boolean = true;
    restrict: string = 'EA';
    scope: any = {
                whenDoneAnimating: '&?'
          };
    link: any = ($scope: ng.IScope, element: JQuery, attr: ng.IAttributes ) => {
        var $sidebarInner: any = element.find('.sidebar-inner');
        var $dropdownElement: any = element.find('.sidebar-dropdown a');
        element.addClass('sidebar');
        $dropdownElement.click(dropdown);
        dropdown: any = (e: any) => {
                var dropClass: string = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    $sidebarInner.slideDown(350, this.scope.whenDoneAnimating);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350, this.scope.whenDoneAnimating);
                }
            };
        
     
    };

}
appLayout.directive('aaSidebar', [() => new AASidebar()]);
