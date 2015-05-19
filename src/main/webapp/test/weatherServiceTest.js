'use strict';

describe('weatherService tests', function() {
    var weatherService, httpBackend;

    beforeEach(function() {
        module('myApp');
    });

    beforeEach(inject(function (_weatherService_, $httpBackend) {
        weatherService = _weatherService_;
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('weather', function() {
        httpBackend.whenGET('weather?q=Utrecht').respond(weather);

        weatherService.weather('Utrecht').then(function(weather) {
            expect(weather.coord.lon).toBe(5.12);
            expect(weather.coord.lat).toBe(52.09);
            expect(weather.sunrise).toEqual(new Date(1432006725 * 1000));
            expect(weather.sunset).toEqual(new Date(1432063993 * 1000));
            expect(weather.name).toBe('Utrecht');
            expect(weather.main.temp).toBe(284.359 - 273.15);
            expect(weather.wind.speed).toBe(8.81);
            expect(weather.wind.degrees).toBe(234.001);
            expect(weather.wind.beaufort).toBe(5);
            expect(weather.wind.direction).toBe('SW');
        });

        httpBackend.flush();
    });
});

var weather = {
        "coord": {
            "lon": 5.12,
            "lat": 52.09
        },
        "sys": {
            "message": 0.3302,
            "country": "NL",
            "sunrise": 1432006725,
            "sunset": 1432063993
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 284.359,
            "temp_min": 284.359,
            "temp_max": 284.359,
            "pressure": 1016.52,
            "sea_level": 1017.53,
            "grnd_level": 1016.52,
            "humidity": 73
        },
        "wind": {
            "speed": 8.81,
            "deg": 234.001
        },
        "clouds": {
            "all": 92
        },
        "dt": 1432027627,
        "id": 2745912,
        "name": "Utrecht",
        "cod": 200
    };