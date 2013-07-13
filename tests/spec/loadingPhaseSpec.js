describe('Loading Phase', function () {

    beforeEach(function () {
        $('.adunit').remove();
        $('script[src*="googletagservices.com/tag/js/gpt.js"]').remove();
        window.googletag = undefined;
    });

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
