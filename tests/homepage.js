casper.test.begin('Homepage', function suite(test) {

    // Start page
    casper.start(url, function () {

        test.assertHttpStatus(200);
        test.assertTitle('Home page');
        test.assertExists('body.cms-index-index');
        test.assertExists('.page .header-container .header h1.logo a[href="' + url + '"]');
        test.assertExists('.col-left .block-tags');
        test.assertExists('.col-right .block-compare');
        test.assertExists('.col-right .block-poll');
        test.assertElementCount('.best-selling td', 6);
    })

    .run(function () {
        test.done();
    });
});

