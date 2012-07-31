jquery.dfp.js - A jQuery DFP implementation
===========================================

This script is a drop in solution for getting DFP working elegantly on your page.

Setup
-----

You can add containers to your page in any location that you would like to display an ad.

By default this script will look for ad units with a class of "adunit".

This minimum information required for an ad unit to function is and ID attribute, for example.

<pre><div class="adunit" id="Ad_unit_id"></div></pre>

In the example above the ID of the div element will be used to look up a corresponding ad unit in DFP and the dimensions of the adunit will be set to the same dimemsions of the div which could be defined in your CSS.

You can optionally specify the adunit and name and dimensions in the following way.

<pre><div class="adunit" data-adunit="Ad_unit_id" data-dimensions="393x176"></div></pre>

This method can be useful for including multiple adunits of the same ID which when part of a DFP placement will pull in as many different ads as possible.

Example Usage
-------------

<pre>
<html>
<head>
    <title>DFP TEST</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="example-bootstrap.js"></script>
</head>
<body>

    <div class="adunit" id="Middle_Feature" data-dimensions="393x176"></div>

</body>
</html>
</pre>

Targeting
----------

The following targeting options are built into this script and should be setup in your DFP account (within Inventory/Custom Targeting) to make full use of them:

<uL>
    <li>Domain - this allows you to target different domains, for example you could test your ads on your staging environment before pushing them live by specifying a domain of staging.yourdomain.com within DFP, this script will take care of the rest.</li>
    <li>inURL - this allows you to target URLs containing the segment you specify in DFP, for example you could set inURL to '/page1' on the targeting options of the DFP line item and it would then allow ads to show on any page that contains /page1 in its URL. e.g. http://www.yourdomain.com/page1 or http://www.yourdomain.com/page1/segment2 or http://www.yourdomain.com/section/page1</li>
    <li>URLIs - this allows you to target the exact URL of the users browser, for example if you set URLIs to '/page1' on the targeting options of the DFP line item it would match http://www.yourdomain.com/page1 only and not http://www.yourdomain.com/page1/segment2</li>
</uL>