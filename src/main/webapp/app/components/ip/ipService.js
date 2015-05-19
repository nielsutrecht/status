angular.module('myApp').service('ipService', function($http) {
    return {
        ip: function() {
            return $http.get(CONFIG.IP_URL).then(function(response) {
                return response.data.ip;
            });
        }
    };
});
