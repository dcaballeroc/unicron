angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/users/users.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section class=mainbar><section class=matter><div class=container><div class=row><div class=\"widget wblue\"><div aa-widget-header=\"\" title={{vm.title}}></div><div class=\"widget-content user\"><section id=Users><h1>Simple Sum</h1><div>1st Number : <input type=number ng-model=vm.firstNumber><br>2nd Number : <input type=number ng-model=vm.secondNumber> <input type=button ng-click=vm.sum() value=ADD><br>Sum : {{vm.result}}</div></section></div></div></div></div></section></section></body></html>");
$templateCache.put("app/layout/aa-top-nav/aa-top-nav.html","<!DOCTYPE HTML><nav class=\"navbar navbar-fixed-top navbar-inverse\"><div class=navbar-header><a href=\"/\" class=navbar-brand><span class=brand-title>{{vm.title}}</span></a> <a class=\"btn navbar-btn navbar-toggle\" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class=\"navbar-collapse collapse\"><div class=\"pull-right navbar-logo\"><ul class=\"nav navbar-nav pull-right\"><li><a ng-href={{vm.tagline.link}} target=_blank>{{vm.tagline.text}}</a></li><li class=\"dropdown dropdown-big\"><a href=http://www.acklenavenue.com target=_blank><img src=images/acklenavenue.png></a></li></ul></div></div></nav>");
$templateCache.put("app/layout/shell/shell.html","<!DOCTYPE HTML><div ng-controller=\"Shell as vm\"><header class=clearfix><aa-top-nav title=vm.title tagline=vm.tagline></aa-top-nav></header><section id=content class=content><div ng-include=\"\'app/layout/sidebar/sidebar.html\'\"></div><div ui-view=\"\" class=shuffle-animation></div><div ngplus-overlay=\"\" ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=../../../images/busy.gif><div class=\"page-spinner-message overlay-message\">{{vm.busyMessage}}</div></div></section></div>");
$templateCache.put("app/layout/sidebar/sidebar.html","<!DOCTYPE HTML><div ng-controller=\"Sidebar as vm\"><aa-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class=\"nlightblue fade-selection-animation\" ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.navRoutes\"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></aa-sidebar></div>");
$templateCache.put("app/widgets/header/aa-widget-header.html","<!DOCTYPE HTML><div class=widget-head><div class=\"page-title pull-left\">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class=\"widget-icons pull-right\" ng-if=allowCollapse><a ht-widget-minimize=\"\"></a></div><small class=\"pull-right page-title-subtle\" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>");}]);