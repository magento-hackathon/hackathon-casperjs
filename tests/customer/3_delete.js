casper.test.begin('Customer removal', function suite(test) {

    // Open the admin login page
    casper.start(admin_url, function () {

        test.assertHttpStatus(200);

        // Fill the form
        this.fill('#loginForm', {
            'login[username]': login_admin_username,
            'login[password]': login_admin_password
        }, true);
    })

    .waitForUrl(admin_url, function () {

        test.assertHttpStatus(200);

        test.assertExists('body.adminhtml-dashboard-index');
        this.clickLabel('Customers');
        this.clickLabel('Manage Customers');
    })

    .then(function () {

        test.assertHttpStatus(200);

        this.evaluate(function (email) {
            document.getElementById('customerGrid_filter_email').value = email;
            customerGridJsObject.doFilter();
        }, login_user_username);
    })

    .wait(3000, function () {

        this.capturePage();
        test.assertElementCount('#customerGrid_table tbody tr', 1);
    })

    .thenClick('#customerGrid_table tbody tr td.last a', function () {

        test.assertHttpStatus(200);

        this.clickLabel('Delete Customer');
    })

    .waitForText('The customer has been deleted.', function () {

        test.assertHttpStatus(200);
    })

    .run(function () {
        test.done();
    });
});
