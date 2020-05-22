//functions and actions available for all or multiple pages within the app

//variables
var alertShown = false;

//handle IE
document.addEventListener("DOMContentLoaded", function () {
    if (!alertShown) { //only run this code once

        // Handler when the DOM is fully loaded
        console.log('DOM Loaded');

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        var trider = ua.indexOf("Trident/");

        if (msie > 0 || trider > 0) {

            alert('You appear to be using Internet Explorer. Many features of type-recorder will not work on Internet Explorer. Please consider an alternative modern browser (i.e. Edge, FireFox, Chrome).');
            alertShown = true;
        }

        alertShown = true;
    }
});