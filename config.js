// Configuration and some usefull methods

/**
 * Debug/Verbose
 * ----------------------------------------------------------------------------
 */
var debug_mode = !!casper.cli.get('verbose');
if (debug_mode) {
    debug_mode = true;
    casper.options.verbose = true;
    casper.options.logLevel = 'debug';
}

/**
 * The view
 * ----------------------------------------------------------------------------
 */

// The viewport size
casper.options.viewportSize = {
    width: 1024,
    height: 768
};

/**
 * Login credentials
 * ----------------------------------------------------------------------------
 */
var login_user_firstname    = 'Firstname';
var login_user_lastname     = 'Lastname';
var login_user_username     = 'email@example.com';
var login_user_password     = 'password';
var login_user_password_bad = "badpassword";

var login_admin_username     = 'admin';
var login_admin_password     = 'test1234';
var login_admin_password_bad = "badpassword";

/**
 * Utils & XPath
 * ----------------------------------------------------------------------------
 */
var utils   = require('utils');
var x       = casper.selectXPath;

/**
 * URLs
 * ----------------------------------------------------------------------------
 */
var url = casper.cli.get("url");
if (!/\/$/.test(url)) {
    // We haven't trailing slash: add it
    url = url + '/';
}

var secure_url = casper.cli.get('secure_url');
if (undefined === secure_url) {
    // Secure URL isn't defined, we get the unsecure one instead
    secure_url = url;
} else if (!/\/$/.test(secure_url)) {
    // We haven't trailing slash: add it
    secure_url = secure_url + '/';
}

// Done for the test file
// ----------------------------------------------------------------------------
casper.test.done();

/**
 * Tear down and set up
 * ----------------------------------------------------------------------------
 */

// Tear down:
// - clear cookies
// - reset captures counter
casper.test.tearDown(function () {

    // Clear cookies
    casper.clearCookies();

    // Reset captures counter
    captures_counter = 0;
});

// Set up: nothing
casper.test.setUp(function () {});

/**
 * Steps
 * ----------------------------------------------------------------------------
 */

// On step start
casper.on("step.start", function() {
    casper.capturePage();
});

/**
 * Tools and cool methods :')
 * ----------------------------------------------------------------------------
 */

// Clear cookies
casper.clearCookies = function () {
    casper.test.info("Clear cookies");
    casper.page.clearCookies();
};


// Print the current page title
casper.printTitle = function () {
    this.echo('### ' + casper.getTitle() + ' ###', 'INFO_BAR');
};

// Capture the current test page
var captures_counter = 0;
casper.capturePage = function (step) {
    var directory = 'captures/' + casper.test.currentSuite.name;
    if (captures_counter > 0) {
        casper.capture(directory + '/step-' + captures_counter + '.jpg');
    }
    captures_counter++;
};
