var appModule = angular.module('myApp');

appModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/ip', {
                templateUrl: 'partials/ip.html',
                controller: 'ExampleCtrl'
            }).
            when('/weather', {
                templateUrl: 'partials/weather.html',
                controller: 'ExampleCtrl'
            }).
            when('/home', {
                templateUrl: 'partials/greeting.html',
                controller: 'ExampleCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]);