describe("Category Exclusion", function () {

    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it("Gets called correctly (ad unit)", function () {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

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
                                  " data-exclusions=\"firstcategory, secondcategory\"></div>");
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.callCount).toEqual(2);
            expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
            expect(mockAdunit.setCategoryExclusion.calls[1].args[0]).toEqual("secondcategory");
        });

    });

    it("Deals with extra comma (ad unit)", function () {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

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
                                  " data-exclusions=\"firstcategory, \"></div>");
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.callCount).toEqual(1);
            expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        });

    });

    it("Deals with one value and no commas (ad unit)", function () {
        var mockAdunit = {
            setCategoryExclusion: function (param) { }
        };

        spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

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
                                  " data-exclusions=\"firstcategory\"></div>");
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag
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
            expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
            expect(mockAdunit.setCategoryExclusion.callCount).toEqual(1);
            expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        });

    });

    it("Gets called correctly (page)", function () {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, "setCategoryExclusion").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setCategoryExclusion: "firstcategory, secondcategory"
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
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.callCount).toEqual(2);
            expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
            expect(mock.setCategoryExclusion.calls[1].args[0]).toEqual("secondcategory");
        });

    });

    it("Deals with extra comma (page)", function () {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, "setCategoryExclusion").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setCategoryExclusion: "firstcategory, "
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
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.callCount).toEqual(1);
            expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        });
    });

    it("Deals with one value and no commas (page)", function () {
        var mock = {};
        mock.setCategoryExclusion = function (param) {
        };

        var dummyTag = {};
        dummyTag.pubads = function () {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            };
        };

        spyOn(mock, "setCategoryExclusion").andCallThrough();

        runs(function () {
            jQuery.dfp({
                dfpID: 'xxxxxxxxx',
                googletag: dummyTag,
                setCategoryExclusion: "firstcategory"
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
            expect(mock.setCategoryExclusion).toHaveBeenCalled();
            expect(mock.setCategoryExclusion.callCount).toEqual(1);
            expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        });
    });

});
