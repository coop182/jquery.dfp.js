describe("SizeMapping", function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it("Gets called correctly (ad unit)", function () {
        var mockAdunit = {
            defineSizeMapping: function (param) { }
        };

        spyOn(mockAdunit, "defineSizeMapping").andCallThrough();

        var dummyTag = {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        runs(function () {
            jQuery("body").append("<div class=\"adunit\" id=\"Ad_unit_id\"" +
                " data-size-mapping=\"my-size-mapping\"></div>");
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
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(mockAdunit.defineSizeMapping).toHaveBeenCalled();
            expect(mockAdunit.defineSizeMapping.callCount).toEqual(1);
            expect(mockAdunit.defineSizeMapping.calls[0].args[0]).toEqual([[[1024, 768],[980, 185]],[[ 980, 600],[[728, 90], [640, 480]]]]);
        });

    });

    it("Deals with name mismatch (ad unit)", function () {
        var mockAdunit = {
            defineSizeMapping: function (param) { }
        };

        spyOn(mockAdunit, "defineSizeMapping").andCallThrough();

        var dummyTag = {};
        dummyTag.defineSlot = function () {
            return {
                addService: function () {
                    return mockAdunit;
                }
            };
        };

        runs(function () {
            jQuery("body").append("<div class=\"adunit\" id=\"Ad_unit_id\"" +
                " data-size-mapping=\"undefined-size-mapping\"></div>");
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
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(mockAdunit.defineSizeMapping.callCount).toEqual(0);
        });

    });

});
