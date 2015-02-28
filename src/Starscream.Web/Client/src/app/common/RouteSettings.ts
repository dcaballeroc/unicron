module RouteSettings {
    'use strict';
    export interface IAcklenAvenueRouteSettings {
        nav: number;
        content: string;
    }

   export  interface IAcklenAvenueRouteConfig extends ng.route.IRoute {
        title: string;
        settings: IAcklenAvenueRouteSettings;
        current?: IAcklenAvenueRouteConfig;
    }

    export interface IAcklenAvenueRoute {
        url: string;
        config: IAcklenAvenueRouteConfig;
    }
}
