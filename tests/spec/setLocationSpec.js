describe("SetLocation", function () {

    var cleanup = function () {
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };

    beforeEach(cleanup);

    it("setLocation method called correctly with latitude and longitude", function () {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(mock, "setLocation").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setLocation: { latitude: 34, longitude: -45.12 }
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (dummyTag.enableServices.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'enableServices' never called", 5000);

        runs(function () {
            expect(mock.setLocation).toHaveBeenCalled();
            expect(mock.setLocation.callCount).toEqual(1);
            expect(mock.setLocation.calls[0].args.length).toEqual(2);
            expect(mock.setLocation.calls[0].args[0]).toEqual(34);
            expect(mock.setLocation.calls[0].args[1]).toEqual(-45.12);
        });
    });

    it("setLocation method called correctly with latitude, longitude and precision", function () {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(mock, "setLocation").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setLocation: { latitude: 34, longitude: -45.12, precision: 1000 }
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (dummyTag.enableServices.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'enableServices' never called", 5000);

        runs(function () {
            expect(mock.setLocation).toHaveBeenCalled();
            expect(mock.setLocation.callCount).toEqual(1);
            expect(mock.setLocation.calls[0].args.length).toEqual(3);
            expect(mock.setLocation.calls[0].args[0]).toEqual(34);
            expect(mock.setLocation.calls[0].args[1]).toEqual(-45.12);
            expect(mock.setLocation.calls[0].args[2]).toEqual(1000);
        });
    });

    it("setLocation method not called with latitude missing", function () {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(mock, "setLocation").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setLocation: { longitude: -45.12, precision: 1000 }
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (dummyTag.enableServices.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'enableServices' never called", 5000);

        runs(function () {
            expect(mock.setLocation).not.toHaveBeenCalled();
        });
    });

    it("setLocation string variable type not accepted ", function () {
        var mock = {};
        mock.setLocation = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setLocation: mock.setLocation
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(mock, "setLocation").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setLocation: { latitude: "34", longitude: -45.12, precision: 1000 }
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (dummyTag.enableServices.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'enableServices' never called", 5000);

        runs(function () {
            expect(mock.setLocation).not.toHaveBeenCalled();
        });
    });
});
