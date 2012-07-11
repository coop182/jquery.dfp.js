/**
 * DFP ADDER
 */

(function($,window) {

	"use strict";

	// DFP account ID
	var dfp_id = '';

	// Count of ads
	var count = 0;

	// Default DFP jQuery selector
	var dfp_selector = '.adunit';

	// Init function sets required params and loads googles dfp script
	var init = function(id,selector,options) {

		dfp_id = id || dfp_id;
		dfp_selector = selector || dfp_selector;
		options = options || {};
		inject_dfp();
		$(function(){create_ads(options);});

	};

	// Main function to find and create all ads
	var create_ads = function(options) {

		// Default DFP options
		var target_paths = get_targetpaths();
		var dfp_options = {
			'setTargeting':{
				'PageURI':target_paths
			}
		};

		// Make sure the default setTargetting is not lost in the object merge
		if(typeof options.setTargeting !== 'undefined' && typeof dfp_options.setTargeting !== 'undefined') {
			options.setTargeting = $.extend(options.setTargeting, dfp_options.setTargeting);
		}

		// Merge options objects
		dfp_options = $.extend(dfp_options, options);

		// Push DFP config options
		window.googletag.cmd.push(function() {

			window.googletag.pubads().enableSingleRequest();
			$.each(dfp_options.setTargeting, function(k,v) {
				//window.console.log(k,v);
				window.googletag.pubads().setTargeting(k,v);
			});
			window.googletag.pubads().collapseEmptyDivs();
			window.googletag.enableServices();

		});

		// Loops through on page adunits and gets ads for them.
		$(dfp_selector).each(function() {

			var adunit = this;

			count++;

			// Adunit name
			var adunit_name = get_name(adunit);

			// Adunit id - this will use an existing id or an auto generated one.
			var adunit_id = get_id(adunit,adunit_name,count);

			// get dimensions of the adunit
			var dimensions = get_dimensions(adunit);

			// get existing content
			var $existing_content = $(adunit).html();

			// wipe html clean ready for ad
			$(adunit).html('');

			// Push commands to DFP to create ads
			window.googletag.cmd.push(function() {

				// Create the ad
				var google_adunit = window.googletag.defineSlot('/'+dfp_id+'/'+adunit_name, [dimensions.width, dimensions.height], adunit_id).addService(window.googletag.pubads());

				// The following hijacks an internal google method to check if the div has been
				// collapsed after the ad has been attempted to be loaded.
				google_adunit.oldRenderEnded = google_adunit.renderEnded;
				google_adunit.renderEnded = function() {

					var display = $(adunit).css('display');
					// if the div has been collapsed but there was existing content expand the
					// div and reinsert the existing content.
					if(display === 'none' && $existing_content.trim().length > 0) {
						$(adunit).show().html($existing_content);
					}
					google_adunit.oldRenderEnded();

				};

				// Display the ad
				window.googletag.display(adunit_id);

			});

		});
	};

	// Create an array of paths so that we can target DFP ads to Page URI's
	var get_targetpaths = function() {

		var paths = window.location.pathname.replace(/\/$/,'');
		var patt = new RegExp('\/([^\/]*)','ig');
		var paths_matches = paths.match(patt);
		var target_paths = ['/'];
		if(paths !== '/' && paths_matches !== null) {
			var target = '';
			if(paths_matches.length > 0) {
				$.each(paths_matches,function(k,v){
					target += v;
					target_paths.push(target);
				});
			}
		}

		return target_paths.reverse();

	};

	// Get the id of the adunit div or generate a unique one.
	var get_id = function (adunit,adunit_name,count) {

		var id = adunit.id;
		if(id === '')
		{
			id = adunit.id = adunit_name + '-auto-gen-id-' + count;
		}

		return id;

	};

	// Get the name of the Ad unit, either use the div id or
	// check for the optional attribute data-adunit
	var get_name = function(adunit) {

		var name = adunit.id;
		if(typeof $(adunit).attr('data-adunit') !== 'undefined') {

			name = $(adunit).attr('data-adunit');

		}

		return name;

	};

	// Get the dimensions of the ad unit using the cotainer div dimensions or
	// check for the optional attribute data-dimensions
	var get_dimensions = function(adunit) {

		var width = $(adunit).width();
		var height = $(adunit).height();

		// check if dimensions are hardcoded and overide the size
		if(typeof $(adunit).attr('data-dimensions') !== 'undefined') {

			var dimensions = $(adunit).attr('data-dimensions').split('x');
			width = parseInt(dimensions[0],10);
			height = parseInt(dimensions[1],10);

		}

		return {width: width, height: height};

	};

	// Call the google DFP script
	var inject_dfp = function() {

		window.googletag = window.googletag || {};
		window.googletag.cmd = window.googletag.cmd || [];

		var gads = document.createElement('script');
		gads.async = true;
		gads.type = 'text/javascript';
		var useSSL = 'https:' === document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') +
		'//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);

	};

	// Create jQuery function
	$.dfp = $.fn.dfp = function(id,options) {

		options = options || {};

		if(typeof id === 'undefined') {
			id = dfp_id;
		}

		if(typeof id === 'object') {
			options = id;
			id = options.dfp_id || dfp_id;
		}

		var selector = this;

		if(typeof this === 'function') {
			selector = dfp_selector;
		}

		init(id,selector,options);

	};

	// Standalone mode - this will run init if the dfp_id is set
	if(dfp_id !== '') {init();}

})(window.jQuery,window);