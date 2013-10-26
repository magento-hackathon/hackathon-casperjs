// Configuration and some usefull methods

// URLS
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

// Utils
var utils = require('utils');

// Login credentials
var login_user_firstname    = 'Firstname';
var login_user_lastname     = 'Lastname';
var login_user_username     = 'email@example.com';
var login_user_password     = 'password';
var login_user_password_bad = "badpassword";

var login_admin_username     = 'admin';
var login_admin_password     = 'test1234';
var login_admin_password_bad = "badpassword";

var counter = 0;


// Casper config
casper.options.viewportSize = {
    width: 1024,
    height: 768
};

// Debug options
casper.options.verbose = true;
casper.options.logLevel = 'debug';

// Test is done for this config file :')
casper.test.done();

// Tear down: clear cookies
casper.clearCookies = function () {
    casper.echo("Clear cookies");
    casper.page.clearCookies();
};
casper.test.tearDown(function () {
    casper.clearCookies();
});


// Print the current page title
casper.printTitle = function () {
    this.echo('### ' + casper.getTitle() + ' ###', 'INFO_BAR');
};

casper.on("step.start", function(step) {
    // currentTestFile  name
    counter++;
    casper.capture('test-caputure' + counter + '.jpg');
});
