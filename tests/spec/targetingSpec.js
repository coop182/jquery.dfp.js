describe('Targeting', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Default Targeting options are set (page)', function (done) {

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

        spyOn(mock, 'setTargeting').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setTargeting).toHaveBeenCalled();
            expect(mock.setTargeting.calls.count()).toEqual(3);
            expect(mock.setTargeting.calls.argsFor(0)[0]).toEqual('UrlHost');
            expect(mock.setTargeting.calls.argsFor(1)[0]).toEqual('UrlPath');
            expect(mock.setTargeting.calls.argsFor(2)[0]).toEqual('UrlQuery');
            done();
        }, 5000);
    });

    it('URL Targeting options are not set (page)', function (done) {

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

        spyOn(mock, 'setTargeting').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            setUrlTargeting: false,
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setTargeting).not.toHaveBeenCalled();
            done();
        }, 5000);
    });

    it('URL Targeting is correct', function (done) {

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

        spyOn(mock, 'setTargeting').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            url: 'http://www.domain.com/path1/path2?param1=1&param2=2'
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setTargeting).toHaveBeenCalled();
            expect(mock.setTargeting.calls.count()).toEqual(3);
            expect(mock.setTargeting.calls.argsFor(0)[0]).toEqual('UrlHost');
            expect(mock.setTargeting.calls.argsFor(1)[0]).toEqual('UrlPath');
            expect(mock.setTargeting.calls.argsFor(2)[0]).toEqual('UrlQuery');
            expect(mock.setTargeting.calls.argsFor(0)[1]).toEqual('www.domain.com');
            expect(mock.setTargeting.calls.argsFor(1)[1]).toEqual('/path1/path2');
            expect(mock.setTargeting.calls.argsFor(2)[1]).toEqual(['param1:1', 'param2:2']);
            done();
        }, 5000);
    });

});
