describe('Callbacks', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };

    beforeEach(cleanup);
    afterEach(cleanup);

    it('slotRenderEnded event listener is added', function (done) {
        var mock = {};
        mock.addEventListener = function (param) { };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: mock.addEventListener
            };
        };

        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();
        spyOn(mock, 'addEventListener').and.callThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag
        });

        waitsForAndRuns(function () {
            if (dummyTag.enableServices.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.addEventListener).toHaveBeenCalled();
            expect(mock.addEventListener.calls.count()).toEqual(1);
            expect(mock.addEventListener.calls.argsFor(0).length).toEqual(2);
            expect(mock.addEventListener.calls.argsFor(0)[0]).toEqual('slotRenderEnded');
            done();
        }, 5000);
    });

    it('afterEachAdLoaded callback is called once (single ad unit)', function (done) {
        var mock = {};
        mock.afterEachAdLoaded = function (param) { };

        spyOn(mock, 'afterEachAdLoaded').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.display = function () {
            mock.afterEachAdLoaded();
        };

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxx',
            afterEachAdLoaded: mock.afterEachAdLoaded,
            googletag: dummyTag,
        });

        waitsForAndRuns(function () {
            if (mock.afterEachAdLoaded.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.afterEachAdLoaded).toHaveBeenCalled();
            expect(mock.afterEachAdLoaded.calls.count()).toEqual(1);
            done();
        }, 5000);
    });

    it('afterEachAdLoaded callback is called twice (two ad units)', function (done) {
        var mock = {};
        mock.slotRenderEnded = function () {};
        mock.addEventListener = function (event, func) {
            mock.slotRenderEnded = func;
        };
        mock.afterEachAdLoaded = function (param) { };

        spyOn(mock, 'afterEachAdLoaded').and.callThrough();

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: mock.addEventListener
            };
        };

        dummyTag.display = function(id) {

            var dummyEvent = {
                slot: {
                    getSlotId: function () {
                        return {
                            getDomId: function () {
                                return 'Leader';
                            }
                        };
                    }
                },
                isEmpty: false
            };

            mock.slotRenderEnded(dummyEvent);
        };
        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            afterEachAdLoaded: mock.afterEachAdLoaded
        });

        waitsForAndRuns(function () {
            if (mock.afterEachAdLoaded.calls.count() > 0) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.afterEachAdLoaded).toHaveBeenCalled();
            expect(mock.afterEachAdLoaded.calls.count()).toEqual(2);
            done();
        }, 5000);
    });

    it('afterAllAdsLoaded callback is called once (single ad unit)', function (done) {
        var mock = {};
        mock.afterAllAdsLoaded = function (param) { };

        spyOn(mock, 'afterAllAdsLoaded').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.display = function () {
            mock.afterAllAdsLoaded();
        };

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxx',
            afterAllAdsLoaded: mock.afterAllAdsLoaded,
            googletag: dummyTag,
        });

        waitsForAndRuns(function () {
            if (mock.afterAllAdsLoaded.calls.count() === 1) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.afterAllAdsLoaded).toHaveBeenCalled();
            expect(mock.afterAllAdsLoaded.calls.count()).toEqual(1);
            done();
        }, 5000);
    });

    it('afterAllAdsLoaded callback is called once (two ad units)', function (done) {
        var mock = {};
        mock.slotRenderEnded = function () {};
        mock.addEventListener = function (event, func) {
            mock.slotRenderEnded = func;
        };
        mock.afterAllAdsLoaded = function (param) { };

        spyOn(mock, 'afterAllAdsLoaded').and.callThrough();

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: mock.addEventListener
            };
        };

        dummyTag.display = function(id) {

            var dummyEvent = {
                slot: {
                    getSlotId: function () {
                        return {
                            getDomId: function () {
                                return 'Leader';
                            }
                        };
                    }
                },
                isEmpty: false
            };

            mock.slotRenderEnded(dummyEvent);
        };
        dummyTag.enableServices = function() {};

        spyOn(dummyTag, 'enableServices').and.callThrough();

        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        $('body').append('<div class="adunit" data-adunit="Leader"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            afterAllAdsLoaded: mock.afterAllAdsLoaded
        });

        waitsForAndRuns(function () {
            if (mock.afterAllAdsLoaded.calls.count() > 0) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.afterAllAdsLoaded).toHaveBeenCalled();
            expect(mock.afterAllAdsLoaded.calls.count()).toEqual(1);
            done();
        }, 5000);
    });

    it('Alter the ad unit name using callback', function (done) {

        var dummyTag = {};
        dummyTag.enableServices = function() {};

        $('body').append('<div class="adunit" data-adunit="Bike" id="leader-123" data-model="BMX"></div>');
        $.dfp({
            dfpID: 'xxxxxxx',
            googletag: dummyTag,
            alterAdUnitName: function(adUnitName,adUnit) {
                return 'PREFIX_' + $(adUnit).data('model') + '_' + adUnitName + '_SUFFIX';
            }
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/PREFIX_BMX_Bike_SUFFIX');
            done();
        }, 5000);
    });

});
