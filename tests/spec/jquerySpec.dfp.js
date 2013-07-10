describe("jquery.dfp.js unit tests", function() {

    beforeEach(function() {
        jQuery(".adunit").remove();
    });

    it("Category exclusion (ad unit)", function() {
        var mockAdunit = {
            setCategoryExclusion: function(param) { }
        };

        spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

        window.googletag = {};
        window.googletag.cmd = {};
        window.googletag.pubads = function () {};
       
        // PUSH 1 = $adCollection loop 
        // PUSH 2 = DFP config options 
        var pushCounter = 1;
        window.googletag.cmd.push = function(callback) {

            if(pushCounter == 1) {
                callback();
            }
            pushCounter++;
        };


        googletag.defineSlot = function() {
            return {
                addService: function() {
                    return mockAdunit; 
                }
            }
        };

        jQuery("body").append( "<div class=\"adunit\" id=\"Ad_unit_id\"" + 
                              " data-exclusions=\"firstcategory, secondcategory\"></div>");

        jQuery.dfp({
            dfpID: 'xxxxxxxxx'
        });


        expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
        expect(mockAdunit.setCategoryExclusion.callCount).toEqual(2);
        expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        expect(mockAdunit.setCategoryExclusion.calls[1].args[0]).toEqual("secondcategory");

    });

    it("Category exclusion (ad unit) extra comma", function() {
        var mockAdunit = {
            setCategoryExclusion: function(param) { }
        };

        spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

        window.googletag = {};
        window.googletag.cmd = {};
        window.googletag.pubads = function () {};
       
        // PUSH 1 = $adCollection loop 
        // PUSH 2 = DFP config options 
        var pushCounter = 1;
        window.googletag.cmd.push = function(callback) {

            if(pushCounter == 1) {
                callback();
            }
            pushCounter++;
        };


        googletag.defineSlot = function() {
            return {
                addService: function() {
                    return mockAdunit; 
                }
            }
        };

        jQuery("body").append("<div class=\"adunit\" id=\"Ad_unit_id\"" + 
                              " data-exclusions=\"firstcategory, \"></div>");

        var test = jQuery(".adunit");

        jQuery.dfp({
            dfpID: 'xxxxxxxxx'
        });


        expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
        expect(mockAdunit.setCategoryExclusion.callCount).toEqual(1);
        expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");

    });

    it("Category exclusion (page)", function() {

        var pushCounter = 1;
        window.googletag = {};
        window.googletag.enableServices = function () {};
        googletag.cmd = {};

        // PUSH 1 = DFP config options 
        window.googletag.cmd.push = function(callback) {

            if(pushCounter == 1) {
                callback();
            }
            pushCounter++;
        };


        var mock = {};
        mock.setCategoryExclusion = function(param) {
        };

        window.googletag.pubads = function () 
        {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            }
        };
       
        spyOn(mock, "setCategoryExclusion").andCallThrough();

        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            setCategoryExclusion: "firstcategory, secondcategory"
        });

        expect(mock.setCategoryExclusion).toHaveBeenCalled();
        expect(mock.setCategoryExclusion.callCount).toEqual(2);
        expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
        expect(mock.setCategoryExclusion.calls[1].args[0]).toEqual("secondcategory");
    });

    it("Category exclusion (page) with extra comma", function() {

        var pushCounter = 1;
        window.googletag = {};
        window.googletag.enableServices = function () {};
        googletag.cmd = {};

        // PUSH 1 = DFP config options 
        window.googletag.cmd.push = function(callback) {

            if(pushCounter == 1) {
                callback();
            }
            pushCounter++;
        };


        var mock = {};
        mock.setCategoryExclusion = function(param) {
        };

        window.googletag.pubads = function () 
        {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            }
        };
       
        spyOn(mock, "setCategoryExclusion").andCallThrough();
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            setCategoryExclusion: "firstcategory,"
        });

        expect(mock.setCategoryExclusion).toHaveBeenCalled();
        expect(mock.setCategoryExclusion.callCount).toEqual(1);
        expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
    });

    it("Category exclusion (page) one value and no commas", function() {

        var pushCounter = 1;
        window.googletag = {};
        window.googletag.enableServices = function () {};
        googletag.cmd = {};

        // PUSH 1 = DFP config options 
        window.googletag.cmd.push = function(callback) {

            if(pushCounter == 1) {
                callback();
            }
            pushCounter++;
        };


        var mock = {};
        mock.setCategoryExclusion = function(param) {
        };

        window.googletag.pubads = function () 
        {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setCategoryExclusion: mock.setCategoryExclusion
            }
        };
       
        spyOn(mock, "setCategoryExclusion").andCallThrough();
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            setCategoryExclusion: "firstcategory"
        });

        expect(mock.setCategoryExclusion).toHaveBeenCalled();
        expect(mock.setCategoryExclusion.callCount).toEqual(1);
        expect(mock.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
    });



});




