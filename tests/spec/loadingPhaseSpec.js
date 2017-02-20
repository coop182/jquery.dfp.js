describe('Loading Phase', function () {

    var cleanup = function () {
        $('script[src*="gpt.js"]').remove();
        $('#testdiv').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Script Appended', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $.dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect($('script[src*="googletagservices.com/tag/js/gpt.js"]').length).toEqual(1);
            done();
        }, 1000);
    });

    it('DFP Script Loaded', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $.dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(window.googletag.getVersion()).toBeGreaterThan('109');
            done();
        }, 5000);
    });

    it('DFP Selector default option', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function() {};
        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(dummyTag, 'defineSlot').and.callThrough();

        $('body').append('<div id="testdiv"><div class="adunit"></div><div class="adunit"></div></div>');

        $.dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if(dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(dummyTag.defineSlot.calls.count()).toEqual(2);
            done();
        }, 5000);
    });

    it('Override DFP Selector', function (done) {
        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function() {};
        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(dummyTag, "defineSlot").and.callThrough();

        $('body').append('<div id="testdiv"><div class="otherselector"></div><div class="otherselector"></div></div>');

        $('.otherselector').dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if(dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(1).toEqual(1);
            expect(dummyTag.defineSlot.calls.count()).toEqual(2);
            done();
        }, 5000);
    });
});
