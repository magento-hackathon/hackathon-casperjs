casper.test.begin('Add To Cart', function suite(test) {

        // Start page
        casper.start(url + 'apparel.html', function () {

        this.printTitle();

        test.info('Testing Login');
        test.info('Target URL: ' + url);

        test.assertUrlMatch(url + 'apparel.html');

        // check, that the first product has a buy button

        // check that the home page has the link login
        test.assertExists('button.button.btn-cart:first-child');
        this.click('button.button.btn-cart:first-child');

    })

    .waitForUrl(url + 'coalesce-functioning-on-impatience-t-shirt.html', function() {

        this.printTitle();

        test.assertUrlMatch(url + 'coalesce-functioning-on-impatience-t-shirt.html');

        this.evaluate(function() {
            var elmt = document.querySelector('select#attribute525');
            elmt.selectedIndex = 2;
            elmt.onchange();
        });

        // check that the home page has the link login
        test.assertExists('button.button.btn-cart');
        this.click('button.button.btn-cart');

    })

    .waitForUrl(url + 'checkout/cart', function() {

        this.printTitle();

        test.assertUrlMatch(url + 'checkout/cart');

    })
    .run(function () {
        test.done();
    });
});

