describe('Loading Phase', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = null;
        delete window.googletag;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Script Appended', function () {

        runs(function () {
            $.dfp({dfpID: 'xxxxxxx'});
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect($('script[src*="googletagservices.com/tag/js/gpt.js"]').length).toEqual(1);
        });

    });

    it('DFP Script Loaded', function () {

        runs(function () {
            $.dfp({dfpID: 'xxxxxxx'});
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(window.googletag.getVersion()).toEqual('23');
        });

    });

});
