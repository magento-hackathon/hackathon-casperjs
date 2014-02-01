casper.test.begin('Register new customer', function suite(test) {

    // Start page
    casper.start(url, function () {

        test.assertHttpStatus(200);

        this.test.pass('Home was loaded');
        // check that the home page has the link login
        test.assertExists('.quick-access ul li.last a[href="' + url_customer_account_login + '"]');
    })

    .thenClick('.quick-access ul li.last a[href="' + url_customer_account_login + '"]', function() {

        test.assertHttpStatus(200);
        this.test.pass('Login page was loaded');
        test.assertExists('.account-login .new-users button');
    })

    .thenClick('.account-login .new-users button', function() {

        test.assertHttpStatus(200);
        this.test.pass('Register page was loaded');

        // check that the form exists
        test.assertExists('div.input-box');
        test.assertExists('input#firstname');
        test.assertExists('input#lastname');
        test.assertExists('input#email_address');
        test.assertExists('input#is_subscribed');
        test.assertExists('input#password');
        test.assertExists('input#confirmation');
        this.test.pass('Register form fields was founded');

        // fill the form
        //TODO: Generate unique data for each test
        test.info('Create new dummy account');
        this.fill('form#form-validate', {
            'firstname': login_user_firstname,
            'lastname': login_user_lastname,
            'email': login_user_username,
            'password': login_admin_password,
            'confirmation': login_admin_password
        }, true);
        this.test.pass('Register form fields was filled');
    })

    .waitForUrl(url + 'customer/account/index/', function() {
        this.test.assertTextExists('Hello, ' + login_user_firstname + ' ' + login_user_lastname + '!', 'page body contains "Hello, ' + login_user_firstname + ' ' + login_user_lastname + '!"');
        this.test.info('Current location is ' + this.getCurrentUrl());
        this.test.pass('Dashboard in');
    })

    .run(function () {
        test.done();
    });
});

