casper.test.begin('Homepage', function suite(test) {

    // Start page
    casper.start(url, function () {

        test.info('Testing Homepage');

        /**
         * User this command to get the url from the command line.
         */
        var targetUrl = casper.cli.get('url')

        test.info('Target URL: ' + targetUrl);

        test.assertTitle('Home page');
        test.assertExists('.page .header-container .header h1.logo a[href="'+targetUrl+'/"]');
        test.assertExists('.box table td:first-child a[href="'+targetUrl+'/sony-vaio-vgn-txn27n-b-11-1-notebook-pc.html"]')
    })

    .run(function () {
        test.done();
    });
});

