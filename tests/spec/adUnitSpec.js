describe('Ad units', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Auto generate an ID for the ad unit if no ID provided', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
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
            expect($('.adunit').attr('id')).toMatch(/Leader-auto-gen-id-\d+/i);
            done();
        }, 5000);

    });

    it('Google ad unit object get attached to the ad unit container', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
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
            expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/Leader');
            done();
        }, 5000);

    });

    it('Google ad unit object get attached to the ad unit container (with namespace)', function (done) {
        var namespace = 'my-long-namespace';

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $('body').append('<div class="adunit"></div>');
        $.dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag,
            namespace: namespace
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/' + namespace);
            done();
        }, 5000);

    });

});
