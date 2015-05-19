var appModule = angular.module('myApp', ['ngRoute','ui.bootstrap']);

appModule.controller('ExampleCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Hello Frontend World!';
}]);
