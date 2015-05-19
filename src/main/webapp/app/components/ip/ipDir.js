angular.module('myApp').directive('ip', ['ipService', function(ipService) {
    return {
        restrict: 'E',
        templateUrl: 'components/ip/ip.html',

        scope: {
        },
        controller: function($scope) {
            ipService.ip().then(function(ip) {
                $scope.ip = ip;
            });
        }
    };
}]);