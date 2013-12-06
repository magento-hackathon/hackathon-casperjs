casper.test.begin('Homepage', function suite(test) {

    // Start page
    casper.start(url, function () {

        this.printTitle();

        test.info('Testing Homepage');

        /**
         * User this command to get the url from the command line.
         */
        test.info('Target URL: ' + url);

        test.assertTitle('Home page');
        test.assertExists('.page .header-container .header h1.logo a[href="' + url + '"]');
        test.assertExists('.page .col2-right-layout .main .col-main .std .page-title');
        test.assertSelectorHasText('.page .col2-right-layout .main .col-main .std .page-title', 'Home Page');
    })

    .run(function () {
        test.done();
    });
});

