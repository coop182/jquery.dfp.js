describe('SetLocation', function () {

    var cleanup = function () {
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };

    beforeEach(cleanup);

    it('setLocation method called correctly with latitude and longitude', function (done) {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'setLocation').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setLocation: { latitude: 34, longitude: -45.12 }
        });

        waitsForAndRuns(function () {
            if (dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setLocation).toHaveBeenCalled();
            expect(mock.setLocation.calls.count()).toEqual(1);
            expect(mock.setLocation.calls.argsFor(0).length).toEqual(2);
            expect(mock.setLocation.calls.argsFor(0)[0]).toEqual(34);
            expect(mock.setLocation.calls.argsFor(0)[1]).toEqual(-45.12);
            done();
        }, 5000);
    });

    it('setLocation method called correctly with latitude, longitude and precision', function (done) {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'setLocation').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setLocation: { latitude: 34, longitude: -45.12, precision: 1000 }
        });

        waitsForAndRuns(function () {
            if (dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setLocation).toHaveBeenCalled();
            expect(mock.setLocation.calls.count()).toEqual(1);
            expect(mock.setLocation.calls.argsFor(0).length).toEqual(3);
            expect(mock.setLocation.calls.argsFor(0)[0]).toEqual(34);
            expect(mock.setLocation.calls.argsFor(0)[1]).toEqual(-45.12);
            expect(mock.setLocation.calls.argsFor(0)[2]).toEqual(1000);
            done();
        }, 5000);
    });

    it('setLocation method not called with latitude missing', function (done) {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'setLocation').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setLocation: { longitude: -45.12, precision: 1000 }
        });

        waitsForAndRuns(function () {
            if (dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setLocation).not.toHaveBeenCalled();
            done();
        }, 5000);
    });

    it('setLocation string variable type not accepted', function (done) {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'setLocation').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setLocation: { latitude: '34', longitude: -45.12, precision: 1000 }
        });

        waitsForAndRuns(function () {
            if (dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setLocation).not.toHaveBeenCalled();
            done();
        }, 5000);
    });
});
