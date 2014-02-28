describe('Ad units', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it("Auto generate an ID for the ad unit if no ID provided", function () {

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
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
            expect($('.adunit').attr('id')).toMatch(/Leader-auto-gen-id-\d+/i);
        });

    });

    it("Google ad unit object get attached to the ad unit container", function () {

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
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
            expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/Leader');
        });

    });

    it("Google ad unit object get attached to the ad unit container (with namespace)", function () {
        var namespace = 'my-long-namespace';

        runs(function () {
            $('body').append('<div class="adunit"></div>');
            $.dfp({dfpID: 'xxxxxxx', namespace: namespace});
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/' + namespace);
        });

    });

});
