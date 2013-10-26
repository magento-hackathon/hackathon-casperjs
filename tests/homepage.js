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
        test.assertExists('.box table td:first-child a[href="' + url + 'sony-vaio-vgn-txn27n-b-11-1-notebook-pc.html"]')
    })

    .run(function () {
        test.done();
    });
});

