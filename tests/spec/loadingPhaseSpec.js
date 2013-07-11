describe('Loading Phase', function () {

    beforeEach(function () {
        $('.adunit').remove();
        $('#testdiv').remove();
        $('script[src*="googletagservices.com/tag/js/gpt.js"]').remove();
        window.googletag = null;
        delete window.googletag;
    });

    it('Script Appended', function () {

        runs(function () {
            $.dfp({dfpID: 'xxxxxxx'});
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect($('script[src*="googletagservices.com/tag/js/gpt.js"]').length).toEqual(1);
        });

    });

    it('DFP Script Loaded', function () {

        runs(function () {
            $.dfp({dfpID: 'xxxxxxx'});
        }, "Kick off loader");

        waitsFor(function () {
            if (typeof window.googletag.getVersion === 'function') {
                return true;
            } else {
                return false;
            }
        }, "getVersion function to exist", 5000);

        runs(function () {
            expect(window.googletag.getVersion()).toEqual('23');
        });

    });

    it('dfpSelector default option', function () {

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function() {};
        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(dummyTag, "defineSlot").andCallThrough();


        $("body").append("<div id='testdiv'>" + 
                "<div class='adunit'></div>" + 
                "<div class='adunit'></div>" + 
            "</div>");

        waitsFor(function() {

            if($("#testdiv").length === 1) {
                return true; 
            } else {
                return false;
            }
        }, "div#testdiv not created", 5000);
        

        runs(function () {
            $.dfp({
                dfpID: 'xxxxxxx', 
                googletag: dummyTag
            });
        }); 

        waitsFor(function () {

            if(dummyTag.enableServices.calls.length === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method enablesServices never got called", 5000);
       
        runs(function () {
            expect(1).toEqual(1);
            expect(dummyTag.defineSlot.calls.length).toEqual(2);
        });
    });

    it('Override dfpSelector', function () {

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.defineSlot = function() {};
        spyOn(dummyTag, "enableServices").andCallThrough();
        spyOn(dummyTag, "defineSlot").andCallThrough();


        $("body").append("<div id='testdiv'>" + 
                "<div class='otherselector'></div>" + 
                "<div class='otherselector'></div>" + 
            "</div>");

        waitsFor(function() {

            if($("#testdiv").length === 1) {
                return true; 
            } else {
                return false;
            }
        }, "div#testdiv not created", 5000);
        

        runs(function () {
            $.dfp({
                dfpID: 'xxxxxxx', 
                dfpSelector: '.otherselector',
                googletag: dummyTag
            });
        }); 

        waitsFor(function () {

            if(dummyTag.enableServices.calls.length === 1) {
                return true;
            } else {
                return false;
            }
        }, "Method enablesServices never got called", 5000);
       
        runs(function () {
            expect(1).toEqual(1);
            expect(dummyTag.defineSlot.calls.length).toEqual(2);
        });
    });
});
