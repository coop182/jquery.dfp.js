describe('SizeMapping', function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Gets called correctly (ad unit)', function (done) {
        var mockAdunit = {
            defineSizeMapping: function (param) { }
        };

        spyOn(mockAdunit, 'defineSizeMapping').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        jQuery('body').append('<div class="adunit" id="Ad_unit_id" data-size-mapping="my-size-mapping"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            sizeMapping: {
                'my-size-mapping': [
                    {browser: [1024, 768], ad_sizes: [980, 185]},
                    {browser: [ 980, 600], ad_sizes: [[728, 90], [640, 480]]}
                ]
            }
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mockAdunit.defineSizeMapping).toHaveBeenCalled();
            expect(mockAdunit.defineSizeMapping.calls.count()).toEqual(1);
            expect(mockAdunit.defineSizeMapping.calls.argsFor(0)[0]).toEqual([[[1024, 768],[980, 185]],[[ 980, 600],[[728, 90], [640, 480]]]]);
            done();
        }, 5000);
    });

    it('Deals with name mismatch (ad unit)', function (done) {
        var mockAdunit = {
            defineSizeMapping: function (param) { }
        };

        spyOn(mockAdunit, 'defineSizeMapping').and.callThrough();

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        jQuery('body').append('<div class="adunit" id="Ad_unit_id" data-size-mapping="undefined-size-mapping"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            sizeMapping: {
                'my-size-mapping': [
                    {browser: [1024, 768], ad_sizes: [980, 185]},
                    {browser: [ 980, 600], ad_sizes: [[728, 90], [640, 480]]}
                ]
            }
        });

        waitsForAndRuns(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, function () {
            expect(mockAdunit.defineSizeMapping.calls.count()).toEqual(0);
            done();
        }, 5000);
    });

});
