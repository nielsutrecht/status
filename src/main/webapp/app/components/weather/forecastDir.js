angular.module('myApp').directive('forecast', ['weatherService', function(weatherService) {
    return {
        restrict: 'E',
        templateUrl: 'components/weather/forecast.html',

        scope: {
            city: '@',
            days: '@',
            hours: '@'
        },
        controller: function($scope) {
            weatherService.forecast($scope.city).then(function(forecast) {
                $scope.forecast = forecast;
            });
        }
    };
}]);