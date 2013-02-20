jQuery DFP - A jQuery implementation for Google DFP
======================================================

This script is a drop in solution for getting DFP working on your page. By including this script on your page and then initiating it in the ways described below you should find it very easy to get DFP working.

Do not include any of the generated DFP script tags from the DFP admin on your page, this script replaces them.

Setup
-----

You can add containers to your page in any location that you would like to display an ad.

By default this script will look for ad units with a class of `adunit` but you can of course use jQuery selectors as well.

This minimum information required for an ad unit to function is having the ad unit specified. To do this you can use the id parameter of the element, for example.

    <div class="adunit" id="Ad_unit_id"></div>

In the example above the ID of the div element will be used to look up a corresponding ad unit in DFP and the dimensions of the adunit will be set to the same dimensions of the div which could be defined in your CSS.

You can optionally specify the adunit name and dimensions in the following way.

    <div class="adunit" data-adunit="Ad_unit_id" data-dimensions="393x176"></div>

This method can be useful for including multiple ad units of the same name which when part of a DFP placement will then pull in as many different creatives as possible.

Also you can optionally specify custom targeting on a per ad unit basis in the following way.

    <div class="adunit" data-adunit="Ad_unit_id" data-dimensions="393x176" data-targeting='{"city_id":"1"}'></div>

Example Usage
-------------

    <html>
    <head>
        <title>DFP TEST</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script src="example-bootstrap.js"></script>
    </head>
    <body>

        <div class="adunit" id="Middle_Feature" data-dimensions="393x176" data-targeting='{"city_id":"1"}'></div>

    </body>
    </html>

Callbacks
---------

This script provides two callbacks which you can use to make working with DFP a little easier.

<uL>
    <li>afterEachAdLoaded - this fires after each ad unit has finished rendering, it is passed one argument which is the ad unit object.</li>
    <li>afterAllAdsLoaded - this fires after all ad units have finished rendering, it is passed the jQuery selector object which will contain all selected ad units on the current page.</li>
</uL>

Please see the example-bootstrap.js file for an example of how to use these.

Default Targeting
-----------------

The following targeting options are built into this script and should be setup in your DFP account (within Inventory/Custom Targeting) to make full use of them:

<uL>
    <li>Domain - this allows you to target different domains, for example you could test your ads on your staging environment before pushing them live by specifying a domain of staging.yourdomain.com within DFP, this script will take care of the rest.</li>
    <li>inURL - this allows you to target URLs containing the segment you specify in DFP, for example you could set inURL to '/page1' on the targeting options of the DFP line item and it would then allow ads to show on any page that contains /page1 in its URL. e.g. http://www.yourdomain.com/page1 or http://www.yourdomain.com/page1/segment2 or http://www.yourdomain.com/section/page1</li>
    <li>URLIs - this allows you to target the exact URL of the users browser, for example if you set URLIs to '/page1' on the targeting options of the DFP line item it would match http://www.yourdomain.com/page1 only and not http://www.yourdomain.com/page1/segment2</li>
    <li>Query - this allows you to target the query parameters of a page. For example if the URL was http://www.yourdomain.com/page1?param1=value1 you could target it with a DFP ad by specifying a Query targeting string of param1:value1</li>
</uL>
