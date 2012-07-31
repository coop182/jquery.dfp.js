(function($,window) {

	"use strict";

	$.getScript("jquery.dfp.min.js", function() {

		$.dfp({

			// Set the DFP ID
			'dfpID':'xxxxxxxx',

			// Callback which is run after the render of each ad.
			'afterEachAdLoaded':function(adUnit) {

				// Do something after each ad is loaded.

			},

			// Callback which is run after the render of all ads.
			'afterAllAdsLoaded':function() {

				// Do something after all ads are loaded.

			}

		});

	});

})(window.jQuery,window);