module RouteSettings {
    'use strict';
    export interface IAcklenAvenueRouteSettings {
        nav: number;
        content: string;
        notShowInMenu?: boolean;
        notShowSideBar?: boolean;
    }

   export  interface IAcklenAvenueRouteConfig extends ng.route.IRoute {
        url: string;
        templateUrl: string;
        controller: string;
        controllerAs: string;
        title?: string;
        settings?: IAcklenAvenueRouteSettings;
    }
    export interface IAcklenAvenueRoute {
        state: string;
        config: IAcklenAvenueRouteConfig;
    }
}
