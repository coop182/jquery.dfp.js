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
            expect(mock.setTargeting.callCount).toEqual(3);
            expect(mock.setTargeting.calls[0].args[0]).toEqual("UrlHost");
            expect(mock.setTargeting.calls[1].args[0]).toEqual("UrlPath");
            expect(mock.setTargeting.calls[2].args[0]).toEqual("UrlQuery");
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

    it("URL Targeting is correct", function () {

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
                googletag: dummyTag,
                url: 'http://www.domain.com/path1/path2?param1=1&param2=2'
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
            expect(mock.setTargeting.callCount).toEqual(3);
            expect(mock.setTargeting.calls[0].args[0]).toEqual('UrlHost');
            expect(mock.setTargeting.calls[1].args[0]).toEqual('UrlPath');
            expect(mock.setTargeting.calls[2].args[0]).toEqual('UrlQuery');
            expect(mock.setTargeting.calls[0].args[1]).toEqual('www.domain.com');
            expect(mock.setTargeting.calls[1].args[1]).toEqual('/path1/path2');
            expect(mock.setTargeting.calls[2].args[1]).toEqual(['param1:1', 'param2:2']);
        });

    });

});
