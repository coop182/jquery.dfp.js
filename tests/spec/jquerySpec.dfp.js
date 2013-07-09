describe("jquery.dfp.js unit tests", function() {

	beforeEach(function() {
		jQuery("#testdiv").remove();
	});

	it("Category exclusion", function() {
		var mockAdunit = {
				setCategoryExclusion: function(param) {
				}
		};

		spyOn(mockAdunit, "setCategoryExclusion").andCallThrough();

		var myGoogletag = {};
		myGoogletag.defineSlot = function() {
			return {
				addService: function() {
					return mockAdunit; 
				}
			}
		};

		myGoogletag.pudads = function() {};
		myGoogletag.cmd = {};
		myGoogletag.cmd.push = function () { };

		jQuery("body").append("<div id=\"testdiv\"></div>" +
													 "<div class=\"adunit\" id=\"Ad_unit_id\"" + 
													" data-exclusions=\"firstcategory, secondcategory\"></div>");

		jQuery.dfp({
    	dfpID: 'xxxxxxxxx',
			googletag: myGoogletag	
    });

		var timeoutExpired = false;


    waitsFor(function() {
      return timeoutExpired;
    }, "Timeout neved expired", 2000);

    runs(function() {
      expect(mockAdunit.setCategoryExclusion).toHaveBeenCalled();
      expect(mockAdunit.setCategoryExclusion.callCount).toEqual(2);
      expect(mockAdunit.setCategoryExclusion.calls[0].args[0]).toEqual("firstcategory");
      expect(mockAdunit.setCategoryExclusion.calls[1].args[0]).toEqual("secondcategory");
    });

		setTimeout(function() {
			timeoutExpired = true;
		}, 750);
	});
});




