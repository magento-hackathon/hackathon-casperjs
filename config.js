// Urls
var url = casper.cli.get("url");
var secure_url = url;

// Utils
var utils = require('utils');

// Login credentials
var login_username = "member@test.com";
var login_password = "password";
var login_password_bad = "badpassword";

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
casper.test.tearDown(function() {
    casper.echo("Clear cookies");
    casper.page.clearCookies();
});

