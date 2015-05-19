angular.module('myApp').directive('weather', ['weatherService', function(weatherService) {
    return {
        restrict: 'E',
        templateUrl: 'components/weather/weather.html',

        scope: {
            city: '@'
        },
        controller: function($scope) {
            weatherService.weather($scope.city).then(function(weather) {
                $scope.weather = weather;
            });
        }
    };
}]);