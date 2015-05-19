'use strict';

describe('ipService tests', function() {
    var ipService, httpBackend;

    beforeEach(function() {
        module('myApp');
    });

    beforeEach(inject(function (_ipService_, $httpBackend) {
        ipService = _ipService_;
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('ip', function() {
        httpBackend.whenGET(CONFIG.IP_URL).respond({ip: '1.2.3.4'});

        ipService.ip().then(function(ip) {
            expect(ip).toBe('1.2.3.4');
        });

        httpBackend.flush();
    });
});