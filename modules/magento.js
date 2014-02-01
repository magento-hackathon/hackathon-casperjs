
// Patch the require
var require = patchRequire(require);

// Require underscore
var _ = require('underscore');

// Urls
var url        = null;
var secure_url = null;
var admin_url  = null;

/**
 * Init the magento module
 * @param string new_url The unsecure URL
 * @param string new_secure_url The secure URL
 * @param string new_admin_url The admin URL
 * @return this
 */
exports.init = function (new_url, new_secure_url, new_admin_url) {
    url        = new_url;
    secure_url = new_secure_url;
    admin_url  = new_admin_url;

    return this;
};

/**
 * Retrieve an url
 * @param string path The URL path
 * @param object parameters The parameters
 * @returns string
 */
// Retrieve an url
exports.getUrl = function (path, parameters) {

    // No params?
    if (!params) {
        params = {};
    }

    // Defualt is unsecure url
    var new_url = url;

    // Process the params
    var params = [];
    if (parameters) {
        _.each(parameters, function (value, index) {
            switch (index) {
                case '_secure':
                    // Secure URL asked
                    if (value) {
                        new_url = secure_url;
                    }
                    break;
                default:
                    params.push(index);
                    params.push(value);
                    break;
            }
        });
    }
    var params_as_string = '';
    if (params.length) {
        params_as_string = '/' + params.join('/');
    }

    // Return the URL
    return new_url + path + params_as_string;
};

/**
 * Retrieve the base URL
 * @return string The URL
 */
exports.getBaseUrl = function (secure) {
    return this.getUrl('', {_secure: !!secure});
};

/**
 * Log the customer
 * @param string username The customer username
 * @param string password The customer password
 * @returns this
 */
exports.login = function(username, password) {
    if (!username || !password) {
        casper.die('Please enter username and password.');
    }
    casper.open(this.getUrl('customer/account/login', {_secure: true})).then(function() {
        casper.fill('form#login-form', {
            'login[username]': username,
            'login[password]': password
        }, true);
    }).waitForUrl(this.getUrl('customer/account', {_secure: true}), function() {});
    return this;
};
