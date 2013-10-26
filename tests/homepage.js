casper.test.begin('Homepage', function suite(test) {

    // Start page
    casper.start(url, function () {
    })

    .run(function () {
        test.done();
    });
});

