(function ($, window) {

	"use strict";

	$.getScript("jquery.dfp.min.js", function () {

		$.dfp({

			// Set the DFP ID
			'dfpID': 'xxxxxxxx',

			// Callback which is run after the render of each ad.
			afterEachAdLoaded: function (adUnit) {

				// Do something after each ad is loaded.

				if ($(adUnit).hasClass('display-none')) {
					// Ad not found
				} else {
					// Ad found
				}

			},

			// Callback which is run after the render of all ads.
			afterAllAdsLoaded: function (adUnits) {

				// Do something after all ads are loaded.

			}
			alterAdUnitName: function(adUnitName,adUnit) {
				// Modify add unit name. For example, can add a prefix or suffix
				return 'PREFIX_' + adUnitName + '_SUFFIX';
			}

		});

	});

})(window.jQuery, window);
