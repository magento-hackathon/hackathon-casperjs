casper.test.begin('404 Not Found', function suite(test) {

    // Start page
    casper.start(mage.getUrl('not-found'), function () {

        test.assertHttpStatus(404);

        test.assertTitle('404 Not Found 1');
        test.assertExists('body.cms-index-noroute');
        test.assertSelectorHasText('.page-head-alt', 'Whoops, our bad...');
    })

    .run(function () {
        test.done();
    });
});

