describe('Category Exclusion', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Gets called correctly (ad unit)', function (done) {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, 'setCategoryExclusion').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        jQuery('body').append('<div class="adunit" id="Ad_unit_id" data-exclusions="firstcategory, secondcategory"></div>');
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.calls.count()).toEqual(2);
            expect(mockAdunit.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            expect(mockAdunit.setCategoryExclusion.calls.argsFor(1)[0]).toEqual('secondcategory');
            done();
        }, 5000);
    });

    it('Deals with extra comma (ad unit)', function (done) {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, 'setCategoryExclusion').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        jQuery('body').append('<div class="adunit" id="Ad_unit_id" data-exclusions="firstcategory, "></div>');
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.calls.count()).toEqual(1);
            expect(mockAdunit.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            done();
        }, 5000);
    });

    it('Deals with one value and no commas (ad unit)', function (done) {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, 'setCategoryExclusion').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        jQuery('body').append('<div class="adunit" id="Ad_unit_id" data-exclusions="firstcategory"></div>');
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.calls.count()).toEqual(1);
            expect(mockAdunit.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            done();
        }, 5000);
    });

    it('Gets called correctly (page)', function (done) {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, 'setCategoryExclusion').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setCategoryExclusion: 'firstcategory, secondcategory'
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.calls.count()).toEqual(2);
            expect(mock.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            expect(mock.setCategoryExclusion.calls.argsFor(1)[0]).toEqual('secondcategory');
            done();
        }, 5000);
    });

    it('Deals with extra comma (page)', function (done) {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, 'setCategoryExclusion').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setCategoryExclusion: 'firstcategory, '
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.calls.count()).toEqual(1);
            expect(mock.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            done();
        }, 5000);
    });

    it('Deals with one value and no commas (page)', function (done) {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                addEventListener: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, 'setCategoryExclusion').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setCategoryExclusion: 'firstcategory'
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.calls.count()).toEqual(1);
            expect(mock.setCategoryExclusion.calls.argsFor(0)[0]).toEqual('firstcategory');
            done();
        }, 5000);
    });

});
