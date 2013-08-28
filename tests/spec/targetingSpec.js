describe("Targeting", function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it("Default Targeting options are set (page)", function () {

        var mock = {};
        mock.setTargeting = function (param) {};

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: mock.setTargeting,
                collapseEmptyDivs: function () {}
            };
        };

        spyOn(mock, "setTargeting").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(mock.setTargeting).toHaveBeenCalled();
            expect(mock.setTargeting.callCount).toEqual(4);
            expect(mock.setTargeting.calls[0].args[0]).toEqual("inURL");
            expect(mock.setTargeting.calls[1].args[0]).toEqual("URLIs");
            expect(mock.setTargeting.calls[2].args[0]).toEqual("Query");
            expect(mock.setTargeting.calls[3].args[0]).toEqual("Domain");
        });

    });

    it("URL Targeting options are not set (page)", function () {

        var mock = {};
        mock.setTargeting = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () { },
                setTargeting: mock.setTargeting,
                collapseEmptyDivs: function () { }
            };
        };

        spyOn(mock, "setTargeting").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                setUrlTargeting: false,
                googletag: dummyTag
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(mock.setTargeting).not.toHaveBeenCalled();
        });

    });

});
