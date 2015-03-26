describe("Callbacks", function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };

    beforeEach(cleanup);
    afterEach(cleanup);

    it("slotRenderEnded event listener is added", function () {
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

        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(mock, "addEventListener").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (dummyTag.enableServices.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'enableServices' never called", 5000);

        runs(function () {
            expect(mock.addEventListener).toHaveBeenCalled();
            expect(mock.addEventListener.callCount).toEqual(1);
            expect(mock.addEventListener.calls[0].args.length).toEqual(2);
            expect(mock.addEventListener.calls[0].args[0]).toEqual('slotRenderEnded');
        });
    });

    it("afterEachAdLoaded callback is called once (single ad unit)", function () {
        var mock = {};
        mock.afterEachAdLoaded = function (param) { };

        spyOn(mock, "afterEachAdLoaded").andCallThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.display = function () {
            mock.afterEachAdLoaded();
        };

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            jQuery.dfp({
                dfpID: 'xxxxxxxx',
                afterEachAdLoaded: mock.afterEachAdLoaded,
                googletag: dummyTag,
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (mock.afterEachAdLoaded.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'afterEachAdLoaded' never called", 5000);

        runs(function () {
            expect(mock.afterEachAdLoaded).toHaveBeenCalled();
            expect(mock.afterEachAdLoaded.callCount).toEqual(1);
        });
    });

    it("afterEachAdLoaded callback is called twice (two ad units)", function () {
        var mock = {};
        mock.slotRenderEnded = function () {};
        mock.addEventListener = function (event, func) {
            mock.slotRenderEnded = func;
        };
        mock.afterEachAdLoaded = function (param) { };

        spyOn(mock, "afterEachAdLoaded").andCallThrough();

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

        spyOn(dummyTag, "enableServices").andCallThrough();

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                afterEachAdLoaded: mock.afterEachAdLoaded
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (mock.afterEachAdLoaded.callCount > 0) {
                return true;
            } else {
                return false;
            }
        }, "Method 'afterEachAdLoaded' never called", 5000);

        runs(function () {
            expect(mock.afterEachAdLoaded).toHaveBeenCalled();
            expect(mock.afterEachAdLoaded.callCount).toEqual(2);
        });
    });

    it("afterAllAdsLoaded callback is called once (single ad unit)", function () {
        var mock = {};
        mock.afterAllAdsLoaded = function (param) { };

        spyOn(mock, "afterAllAdsLoaded").andCallThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.display = function () {
            mock.afterAllAdsLoaded();
        };

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            jQuery.dfp({
                dfpID: 'xxxxxxxx',
                afterAllAdsLoaded: mock.afterAllAdsLoaded,
                googletag: dummyTag,
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (mock.afterAllAdsLoaded.callCount === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method 'afterAllAdsLoaded' never called", 5000);

        runs(function () {
            expect(mock.afterAllAdsLoaded).toHaveBeenCalled();
            expect(mock.afterAllAdsLoaded.callCount).toEqual(1);
        });
    });

    it("afterAllAdsLoaded callback is called once (two ad units)", function () {
        var mock = {};
        mock.slotRenderEnded = function () {};
        mock.addEventListener = function (event, func) {
            mock.slotRenderEnded = func;
        };
        mock.afterAllAdsLoaded = function (param) { };

        spyOn(mock, "afterAllAdsLoaded").andCallThrough();

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

        spyOn(dummyTag, "enableServices").andCallThrough();

        runs(function () {
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            $('body').append('<div class="adunit" data-adunit="Leader"></div>');
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                afterAllAdsLoaded: mock.afterAllAdsLoaded
            });
        }, "Kick off loader");

        waitsFor(function () {
            if (mock.afterAllAdsLoaded.callCount > 0) {
                return true;
            } else {
                return false;
            }
        }, "Method 'afterEachAdLoaded' never called", 5000);

        runs(function () {
            expect(mock.afterAllAdsLoaded).toHaveBeenCalled();
            expect(mock.afterAllAdsLoaded.callCount).toEqual(1);
        });
    });

    it("Alter the ad unit name using callback", function () {

      var dummyTag = {};
      dummyTag.enableServices = function() {};

      runs(function () {
        $('body').append('<div class="adunit" data-adunit="Bike" id="leader-123" data-model="BMX"></div>');
        $.dfp({
          dfpID: 'xxxxxxx',
          googletag: dummyTag,
          alterAdUnitName: function(adUnitName,adUnit) {
            return "PREFIX_" + $(adUnit).data('model') + "_" + adUnitName + "_SUFFIX";
          }
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
        expect($('.adunit').data('googleAdUnit').getName()).toEqual('/xxxxxxx/PREFIX_BMX_Bike_SUFFIX');
      });

    });

});
