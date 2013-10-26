// The cart HREF
var cart_href = 'checkout/cart';

// The test
casper.test.begin('Empty cart', function suite(test) {

    // Start on the homepage
    casper.start(url, function () {

        this.printTitle();

        // Clear cookies to be sure :')
        casper.clearCookies();

        // Cart link exists?
        test.assertExists('.page .header-container .header .quick-access .links li > a.top-link-cart');
    })

    // Then go to the empty cart page
    .thenClick('.page .header-container .header .quick-access .links li > a.top-link-cart', function () {

        this.printTitle();

        // Are we on the cart page?
        test.assertExists('body.checkout-cart-index');

        // Test title
        test.assertTitle('Shopping Cart');

        // Is empty?
        test.assertExists('.main .col-main .page-title h1');
        test.assertSelectorHasText('.main .col-main .page-title h1', 'Shopping Cart is Empty');

        // Get the URL of the first link in the menu and compare it with the url
        test.assertUrlMatch(url + cart_href);
    })

    .run(function () {
        test.done();
    });
});

