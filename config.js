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

var colorizer = require('colorizer').create('Colorizer');

/**
 * The view
 * ----------------------------------------------------------------------------
 */

// The viewport size
casper.options.viewportSize = {
    width: 1200,
    height: 900
};

/**
 * The HTTP responses
 * ----------------------------------------------------------------------------
 */
casper.options.httpStatusHandlers = {
    200:  function(self, resource) {
        this.echo(resource.url + " is OK (200)", "INFO");
    },
    400:  function(self, resource) {
        this.echo(resource.url + " is nok (400)", "INFO");
    },
    404: function(self, resource) {
        this.echo("Resource at " + resource.url + " not found (404)", "COMMENT");
    },
    302: function(self, resource) {
        this.echo(resource.url + " has been redirected (302)", "INFO");
    }
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

var user_address_company    = 'Necrosoft';
var user_address_street     = '1156 High Street';
var user_address_city       = 'Santa Cruz';
var user_address_region     = 'California';
var user_address_postcode   = '95064';
var user_address_country    = 'United States';
var user_address_telephone  = '12345678';
var user_address_fax        = '12345678';

var login_admin_username     = 'admin';
var login_admin_password     = 'test1234';
var login_admin_password_bad = "badpassword";

/**
 * Utils, XPath, FileSystem
 * ----------------------------------------------------------------------------
 */
var utils   = require('utils');
var x       = casper.selectXPath;
var fs      = require('fs');

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

var admin_url = casper.cli.get('admin_url');
if (undefined === admin_url) {
    // Admin URL is secured by default, if not, specify the command line option
    admin_url = secure_url + 'admin/';
} else if (!/\/$/.test(admin_url)) {
    // We haven't trailing slash: add it
    admin_url = admin_url + '/';
}

url_customer_account_index  = secure_url + 'customer/account/';
url_customer_account_login  = secure_url + 'customer/account/login/';
url_customer_account_create = secure_url + 'customer/account/create/';

url_checkout_cart_index = secure_url + 'checkout/cart/';

// Magento module
// ----------------------------------------------------------------------------
var mage = require(fs.workingDirectory + '/modules/magento');
mage.init(url, secure_url, admin_url);

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

casper.on("started", function() {
    casper.clearCookies();
});

casper.on("load.failed", function() {
    casper.capturePage();
});

casper.on("load.finished", function() {
    casper.printTitle();
    casper.capturePage();
});

casper.on("fill", function() {
    casper.capturePage();
});

casper.on("mouse.down", function() {
    casper.capturePage();
});

casper.on("mouse.move", function() {
    casper.capturePage();
});

casper.on("mouse.move", function() {
    casper.capturePage();
});

casper.on("step.complete", function() {
    casper.capturePage();
});

casper.on("step.error", function() {
    casper.capturePage('error');
});

casper.on("http.status.500", function() {
    casper.capturePage('500');
});

casper.on("http.status.404", function() {
    casper.capturePage('404');
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
casper.capturePage = function (debug_name) {
    var directory = 'captures/' + casper.test.currentSuite.name;
    if (captures_counter > 0) {
        var previous = directory + '/step-' + (captures_counter-1) + '.jpg';
        if (debug_name) {
            var current = directory + '/step-' + captures_counter + '-' + debug_name + '.jpg';
        } else {
            var current = directory + '/step-' + captures_counter + '.jpg';
        }
        casper.capture(current);

        // If previous is same as current (and no debug_name), remove current
        if (!debug_name && fs.isFile(previous) && fs.read(current) === fs.read(previous) && fs.isFile(current)) {
            fs.remove(current);
            captures_counter--;
            casper.log('Capture removed because same as previous', 'warning');
        }
    } else {
        // We remove the directory to cleanup
        fs.removeTree(directory);
    }
    captures_counter++;
};

