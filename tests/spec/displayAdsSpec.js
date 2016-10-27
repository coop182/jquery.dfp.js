describe('Display Ad units', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Refresh ads in single request with disable init load', function (done) {
        var mock = {};
            mock.refresh = function (param) {
        };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                disableInitialLoad: function () {},
                addEventListener: function () {},
                refresh: mock.refresh
            };
        };

        dummyTag.enableServices = function () {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'refresh').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            disableInitialLoad: true
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.refresh).toHaveBeenCalled();
            done();
        }, 5000);
    });
});