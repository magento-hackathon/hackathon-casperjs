casper.test.begin('Customer login', function suite(test) {

    // Start page
    casper.start(url, function () {

        this.printTitle();

        test.info('Testing Login');
        test.info('Target URL: ' + url);

        // check that the home page has the link login
        test.assertExists('.quick-access ul li.last a[href="' + url + 'customer/account/login/"]');
        this.click('.quick-access ul li.last a[href="' + url + 'customer/account/login/"]');

    })

    .then(function() {

        this.printTitle();

        // check that the form exists
        test.assertExists('div.input-box');
        test.assertExists('input#email');
        test.assertExists('input#pass');

        // fill the form with wrong credentials
        test.info('Login with invalid identifiers');
        this.fill('form#login-form', {
            'login[username]': login_user_username,
            'login[password]': login_user_password_bad
        }, true);

    })

    .then(function() {

        this.printTitle();

        // test that the current url is still the same as we do net get redirected sucessfully due to wrong credentials
        test.info('Current url: ' + this.getCurrentUrl());
        test.assertUrlMatch(url + 'customer/account/login/');

        // relogin with good credentials
        test.info('Login with valid identifiers');
        this.fill('form#login-form', {
            'login[username]': login_user_username,
            'login[password]': login_user_password
        }, true);

    })

    .then(function() {

        this.printTitle();

        // this url will only be available when you are logged in. Otherwise you will get redirected
        var reg = new RegExp(url + 'customer\/account\/?$');
        test.assertUrlMatch(reg);

    })

    .run(function () {
        test.done();
    });
});

