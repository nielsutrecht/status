angular.module('myApp').service('weatherService', function($http) {
    var beaufort = [0.3,1.5,3.3,5.5,8,10.8,13.9,17.2,20.7,24.5,28.4,32.6];
    var directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    function toBeaufort(mps) {
        for(var i = 0;i < beaufort.length;i++) {
            if(mps < beaufort[i]) {
                return i;
            }
        }

        return 12;
    }

    function toDirection(degrees) {
        degrees += 11.25;
        if(degrees > 360) {
            degrees -= 360;
        }
        var index = Math.floor(degrees / (360 / directions.length));

        return directions[index];
    }

    return {
        weather: function(city) {
            return $http.get(CONFIG.WEATHER_URL + city).then(function(response) {
                var weather = {
                        name: response.data.name,
                        main: {
                            temp: response.data.main.temp - 273.15,
                            humidity: response.data.main.humidity
                        },
                        coord: response.data.coord,
                        sunrise: new Date(response.data.sys.sunrise * 1000),
                        sunset: new Date(response.data.sys.sunset * 1000),
                        wind: {
                                speed: response.data.wind.speed,
                                degrees: response.data.wind.deg,
                                beaufort: toBeaufort(response.data.wind.speed),
                                direction: toDirection(response.data.wind.deg)
                        }
                };

                return weather;
            });
        },
        
        forecast: function(city) {
        	return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=Utrecht,NL&mode=json&units=metric&cnt=7').then(function(response){
        		var weather = {
        				city: response.data.city.name,
        				days: response.data.list.map(function(val) {
        					return {
        						date: new Date(val.dt * 1000),
        						temp: val.temp.day,
        						description: val.weather[0].description,
                                wind: {
                                    speed: val.speed,
                                    degrees: val.deg,
                                    beaufort: toBeaufort(val.speed),
                                    direction: toDirection(val.deg)
                                }
        					};
        				})
        		};
        		return weather;
        	});
        }
    };
});