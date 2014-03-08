// The test
casper.test.begin('Empty cart', function suite(test) {

    // Start on the homepage
    casper.start(mage.getBaseUrl(), function () {

        test.assertHttpStatus(200);

        // Cart link exists?
        test.assertExists('.page .header-container .header .quick-access .links li > a.top-link-cart');
    })

    // Then go to the empty cart page
    .thenClick('.page .header-container .header .quick-access .links li > a.top-link-cart', function () {

        test.assertHttpStatus(200);

        // Are we on the cart page?
        test.assertExists('body.checkout-cart-index');

        // Test title
        test.assertTitle('Shopping Cart');

        // Is empty?
        test.assertExists('.main .col-main .page-title h1');
        test.assertSelectorHasText('.main .col-main .page-title h1', 'Shopping Cart is Empty');

        // Get the URL of the first link in the menu and compare it with the url
        test.assertUrlMatch(mage.getUrl('checkout/cart'));

        // Is the link to continue shopping here?
        test.assertExists('.cart-empty > p > a[href="' + mage.getBaseUrl() + '"]');
    })

    .thenClick('.cart-empty > p > a[href="' + mage.getBaseUrl() + '"]', function () {

        test.assertHttpStatus(200);

        // We are on the homepage
        test.assertExists('body.cms-index-index');
    })

    .run(function () {
        test.done();
    });
});

