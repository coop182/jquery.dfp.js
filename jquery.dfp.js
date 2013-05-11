/**
 * jQuery DFP v1.0.11
 * http://github.com/coop182/jquery.dfp.js
 *
 * Copyright 2013 Matt Cooper
 * Released under the MIT license
 */
(function ($, window) {

    "use strict";

    // Save Scope
    var dfpScript = this;

    // DFP account ID
    var dfpID = '';

    // Count of ads
    var count = 0;

    // Count of rendered ads
    var rendered = 0;

    // Default DFP jQuery selector
    var dfpSelector = '.adunit';

    // DFP options object
    var dfpOptions = {};

    // Keep track of if we've already tried to load gpt.js before
    var dfpIsLoaded = false;

    /**
     * Init function sets required params and loads Google's DFP script
     * @param  String id       The DFP account ID
     * @param  String selector The adunit selector
     * @param  Object options  Custom options to apply
     */
    var init = function (id, selector, options) {

        dfpID = id || dfpID;
        dfpSelector = selector || dfpSelector;
        options = options || {};

        setOptions(options);
        dfpLoader();

        $(function () {
            var ads = createAds(options);
            displayAds(ads);
        });

    };

    /**
     * Set the options for DFP
     * @param Object options Custom options to apply
     */
    var setOptions = function (options) {

        // Get URL Targeting
        var URLTargets = getURLTargets();

        // Set default options
        dfpOptions = {
            'setTargeting': {
                'inURL': URLTargets.inURL,
                'URLIs': URLTargets.URLIs,
                'Query': URLTargets.Query,
                'Domain': window.location.host
            },
            'enableSingleRequest': true,
            'collapseEmptyDivs': 'original',
            'targetPlatform': 'web',
            'enableSyncRendering': false,
            'refreshExisting': true
        };

        // Merge options objects
        $.extend(true, dfpOptions, options);

        // If a custom googletag is specified, use it.
        if (dfpOptions.googletag) {
            window.googletag.cmd.push(function () {
                $.extend(window.googletag, dfpOptions.googletag);
            });
        }

    };

    /**
     * Find and create all Ads
     * @param Object options Custom options to apply
     * @return Array an array of ad units that have been created.
     */
    var createAds = function (options) {

        // Array to Store AdUnits
        var adUnitArray = [];

        // Loops through on page Ad units and gets ads for them.
        $(dfpSelector).each(function () {

            var $adUnit = $(this);

            count++;

            // adUnit name
            var adUnitName = getName($adUnit);

            // adUnit id - this will use an existing id or an auto generated one.
            var adUnitID = getID($adUnit, adUnitName, count);

            // get dimensions of the adUnit
            var dimensions = getDimensions($adUnit);

            // get existing content
            var $existingContent = $adUnit.html();

            // wipe html clean ready for ad and set the default display class.
            $adUnit.html('').addClass('display-none');

            // Store AdUnits
            adUnitArray.push(adUnitID);

            // Push commands to DFP to create ads
            window.googletag.cmd.push(function () {

                var googleAdUnit;

                if (typeof $adUnit.data('googleAdUnit') === 'undefined') {

                    // Create the ad - out of page or normal
                    if (typeof $adUnit.data('outofpage') !== 'undefined') {
                        googleAdUnit = window.googletag.defineOutOfPageSlot('/' + dfpID + '/' + adUnitName, adUnitID).addService(window.googletag.pubads());
                    } else {
                        googleAdUnit = window.googletag.defineSlot('/' + dfpID + '/' + adUnitName, dimensions, adUnitID).addService(window.googletag.pubads());
                    }

                } else {

                    // Get existing ad unit
                    googleAdUnit = $adUnit.data('googleAdUnit');

                }

                // Sets custom targeting for just THIS ad unit if it has been specified
                if (typeof $adUnit.data("targeting") === 'object') {
                    $.each($adUnit.data("targeting"), function (k, v) {
                        googleAdUnit.setTargeting(k, v);
                    });
                }

                // The following hijacks an internal google method to check if the div has been
                // collapsed after the ad has been attempted to be loaded.
                googleAdUnit.oldRenderEnded = googleAdUnit.oldRenderEnded || googleAdUnit.renderEnded;
                googleAdUnit.renderEnded = function () {

                    rendered++;

                    var display = $adUnit.css('display');

                    // if the div has been collapsed but there was existing content expand the
                    // div and reinsert the existing content.
                    if (display === 'none' && $.trim($existingContent).length > 0 && dfpOptions.collapseEmptyDivs === 'original') {
                        $adUnit.show().html($existingContent);
                        display = 'block display-original';
                    }

                    $adUnit.removeClass('display-none').addClass('display-' + display);

                    googleAdUnit.oldRenderEnded();

                    // Excute afterEachAdLoaded callback if provided
                    if (typeof dfpOptions.afterEachAdLoaded === 'function') {
                        dfpOptions.afterEachAdLoaded.call(this, $adUnit);
                    }

                    // Excute afterAllAdsLoaded callback if provided
                    if (typeof dfpOptions.afterAllAdsLoaded === 'function' && rendered === count) {
                        dfpOptions.afterAllAdsLoaded.call(this, $(dfpSelector));
                    }

                };

                // Store googleAdUnit reference
                $adUnit.data('googleAdUnit', googleAdUnit);

            });

        });

        // Push DFP config options
        window.googletag.cmd.push(function () {

            if (dfpOptions.enableSingleRequest === true) {
                window.googletag.pubads().enableSingleRequest();
            }
            $.each(dfpOptions.setTargeting, function (k, v) {
                window.googletag.pubads().setTargeting(k, v);
            });
            if (dfpOptions.collapseEmptyDivs === true || dfpOptions.collapseEmptyDivs === 'original') {
                window.googletag.pubads().collapseEmptyDivs();
            }
            window.googletag.enableServices();

        });

        return adUnitArray;

    };

    /**
     * Display all created Ads
     * @param Array adUnitArray an array of created ads
     */
    var displayAds = function (adUnitArray) {

        // Display each ad
        $.each(adUnitArray, function (key, adUnitID) {

            var $adUnit = $('#' + adUnitID);

            if (dfpOptions.refreshExisting && typeof $adUnit.data('googleAdUnit') !== 'undefined' && $adUnit.hasClass('display-block')) {

                window.googletag.cmd.push(function () { window.googletag.pubads().refresh([$adUnit.data('googleAdUnit')]); });

            } else {

                window.googletag.cmd.push(function () { window.googletag.display(adUnitID); });

            }

        });

    };

    /**
     * Create an array of paths so that we can target DFP ads to Page URI's
     * @return Array an array of URL parts that can be targeted.
     */
    var getURLTargets = function () {

        // Get the paths for targeting against
        var paths = window.location.pathname.replace(/\/$/, '');
        var patt = new RegExp('\/([^\/]*)', 'ig');
        var pathsMatches = paths.match(patt);
        var targetPaths = ['/'];
        var longestpath = '';
        if (paths !== '/' && pathsMatches !== null) {
            var target = '';
            var size = pathsMatches.length;
            if (size > 0) {
                for (var i = 0; i < size; i++) {
                    target = pathsMatches[i];
                    targetPaths.push(target);
                    for (var j = i + 1; j < size; j++) {
                        target += pathsMatches[j];
                        targetPaths.push(target);
                    }
                    if (i === 0) {
                        targetPaths.splice(-1, 1);
                        longestpath = target;
                    }
                }
            }
            targetPaths.push(longestpath);
        }

        targetPaths = targetPaths.reverse();

        // Get the query params for targeting against
        var url = window.location.toString().replace(/\=/ig, ':').match(/\?(.+)$/);
        var params = RegExp.$1.split("&");

        return {
            'inURL': targetPaths,
            'URLIs': targetPaths[0],
            'Query': params
        };

    };

    /**
     * Get the id of the adUnit div or generate a unique one.
     * @param  Object $adUnit     The adunit to work with
     * @param  String adUnitName The name of the adunit
     * @param  Integer count     The current count of adunit, for uniqueness
     * @return String             The ID of the adunit or a unique autogenerated ID
     */
    var getID = function ($adUnit, adUnitName, count) {

        return $adUnit.attr('id') || $adUnit.attr('id', adUnitName + '-auto-gen-id-' + count).attr('id');

    };

    /**
     * Get the name of the Ad unit, either use the div id or
     * check for the optional attribute data-adunit
     * @param  Object $adUnit The adunit to work with
     * @return String        The name of the adunit, will be the same as inside DFP
     */
    var getName = function ($adUnit) {

        var name = $adUnit.attr('id');
        if (typeof $adUnit.data('adunit') !== 'undefined') {

            name = $adUnit.data('adunit');

        }

        return name;

    };

    /**
     * Get the dimensions of the ad unit using the container div dimensions or
     * check for the optional attribute data-dimensions
     * @param  Object $adUnit The adunit to work with
     * @return Array         The dimensions of the adunit (width, height)
     */
    var getDimensions = function ($adUnit) {

        var dimensions = [],
            dimensionsData = $adUnit.data('dimensions');

        // Check if data-dimensions are specified. If they aren't, use the dimensions of the ad unit div.
        if (typeof dimensionsData !== 'undefined') {

            var dimensionGroups = dimensionsData.split(',');

            $.each(dimensionGroups, function (k, v) {

                var dimensionSet = v.split('x');
                dimensions.push([parseInt(dimensionSet[0], 10), parseInt(dimensionSet[1], 10)]);

            });

        } else {

            dimensions.push([$adUnit.width(), $adUnit.height()]);

        }

        return dimensions;

    };

    /**
     * Call the google DFP script - there is a little bit of error detection in here to detect
     * if the dfp script has failed to load either through an error or it being blocked by an ad
     * blocker... if it does not load we execute a dummy script to replace the real DFP.
     */
    var dfpLoader = function () {

        // make sure we don't load gpt.js multiple times
        dfpIsLoaded = dfpIsLoaded || $('script[src*="googletagservices.com/tag/js/gpt.js"]').length;
        if (dfpIsLoaded) {
            return;
        }

        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';

        // Adblock blocks the load of Ad scripts... so we check for that
        gads.onerror = function () {
            dfpBlocked();
        };

        var useSSL = 'https:' === document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);

        // Adblock plus seems to hide blocked scripts... so we check for that
        if (gads.style.display === 'none') {
            dfpBlocked();
        }

    };

    /**
     * This function gets called if DFP has been blocked by an adblocker
     * it implements a dummy version of the dfp object and allows the script to excute its callbacks
     * regardless of whether DFP is actually loaded or not... it is basically only useful for situations
     * where you are laying DFP over existing content and need to init things like slide shows after the loading
     * is completed.
     */
    var dfpBlocked = function () {

        // Get the stored dfp commands
        var commands = window.googletag.cmd;

        // SetTimeout is a bit dirty but the script does not execute in the correct order without it
        setTimeout(function () {

            // overwrite the dfp object - replacing the command array with a function and defining missing functions
            window.googletag = {
                cmd: {
                    push: function (callback) {
                        callback.call(dfpScript);
                    }
                },
                ads: [],
                pubads: function () { return this; },
                enableSingleRequest: function () { return this; },
                setTargeting: function () { return this; },
                collapseEmptyDivs: function () { return this; },
                enableServices: function () { return this; },
                defineSlot: function (name, dimensions, id) {
                    window.googletag.ads.push(id);
                    window.googletag.ads[id] = {
                        renderEnded: function () {},
                        addService: function () { return this; }
                    };
                    return window.googletag.ads[id];
                },
                defineOutOfPageSlot: function (name, id) {
                    window.googletag.ads.push(id);
                    window.googletag.ads[id] = {
                        renderEnded: function () {},
                        addService: function () { return this; }
                    };
                    return window.googletag.ads[id];
                },
                display: function (id) {
                    window.googletag.ads[id].renderEnded.call(dfpScript);
                    return this;
                }

            };

            // Execute any stored commands
            $.each(commands, function (k, v) {
                window.googletag.cmd.push(v);
            });

        }, 50);

    };

    /**
     * Add function to the jQuery namespace
     * @param  String id      (Optional) The DFP account ID
     * @param  Object options (Optional) Custom options to apply
     */
    $.dfp = $.fn.dfp = function (id, options) {

        options = options || {};

        if (typeof id === 'undefined') {
            id = dfpID;
        }

        if (typeof id === 'object') {
            options = id;
            id = options.dfpID || dfpID;
        }

        var selector = this;

        if (typeof this === 'function') {
            selector = dfpSelector;
        }

        init(id, selector, options);

        return this;

    };

})(window.jQuery, window);
