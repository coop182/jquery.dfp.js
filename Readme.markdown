jquery.dfp.js - A jQuery DFP implementation
===========================================

This script is a drop in solution for getting DFP working elegantly on your page.

Example Usage
-------------

<html>
<head>
    <title>DFP TEST</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="jquery.dfp.js"></script>
</head>
<body>

    <div class="adunit" id="Middle_Feature" data-dimensions="393x176"></div>

    <script>
    $.dfp({

        // Set the DFP ID
        'dfpID':'xxxxxxxxxx',

        'afterEachAdLoaded': function() {
            // Do something after each ad has rendered
        },

        'afterAllAdsLoaded': function() {
            // Do something once all ads have rendered
        }

    });
    </script>

</body>
</html>