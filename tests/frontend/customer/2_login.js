casper.test.begin('Customer login', function suite(test) {

    // Start page
    casper.start(mage.getBaseUrl(), function () {

        test.assertHttpStatus(200);

        // check that the home page has the link login
        test.assertExists('.quick-access ul li.last a[href="' + mage.getUrl('customer/account/login') + '"]');
    })

    .thenClick('.quick-access ul li.last a[href="' + mage.getUrl('customer/account/login') + '"]', function() {

        test.assertHttpStatus(200);

        // check that the form exists
        test.assertExists('div.input-box');
        test.assertExists('input#email');
        test.assertExists('input#pass');

        // Forgot password link
        test.assertExists('#login-form .registered-users .buttons-set a');
        test.assertSelectorHasText('#login-form .registered-users .buttons-set a', 'Forgot Your Password?');

        // fill the form with wrong credentials
        test.info('Login with invalid identifiers');
        this.fill('form#login-form', {
            'login[username]': login_user_username,
            'login[password]': login_user_password_bad
        }, true);
    })

    .waitForUrl(/customer\/account\/login/, function() {

        test.assertHttpStatus(200);

        // test that the current url is still the same as we do net get redirected sucessfully due to wrong credentials
        test.info('Current url: ' + this.getCurrentUrl());
        test.assertUrlMatch(mage.getUrl('customer/account/login'));

        // relogin with good credentials
        test.info('Login with valid identifiers');
        this.fill('form#login-form', {
            'login[username]': login_user_username,
            'login[password]': login_user_password
        }, true);
    })

    .waitForUrl(/customer\/account/, function() {

        test.assertHttpStatus(200);

        // this url will only be available when you are logged in. Otherwise you will get redirected
        test.info(casper.getCurrentUrl());
        var reg = new RegExp(secure_url + 'customer\/account\/?$');
        test.assertUrlMatch(reg);
    })

    .run(function () {
        test.done();
    });
});

