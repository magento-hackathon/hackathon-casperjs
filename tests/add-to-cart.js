casper.test.begin('Add To Cart', function suite(test) {

    // Start page
    casper.start(mage.getDirectUrl('apparel.html'), function () {

        test.assertHttpStatus(200);

        test.assertUrlMatch(mage.getDirectUrl('apparel.html'));

        // check that the home page has the link login
        test.assertExists('button.button.btn-cart:first-child');
        this.click('button.button.btn-cart:first-child');

    })

    .waitForUrl(mage.getDirectUrl('coalesce-functioning-on-impatience-t-shirt.html'), function() {

        test.assertHttpStatus(200);

        test.assertUrlMatch(mage.getDirectUrl('coalesce-functioning-on-impatience-t-shirt.html'));

        this.evaluate(function() {
            var elmt = document.querySelector('select#attribute525');
            elmt.selectedIndex = 2;
            elmt.onchange();
        });

        // check that the home page has the link login
        test.assertExists('button.button.btn-cart');
        this.click('button.button.btn-cart');
    })

    .waitForUrl(mage.getUrl('checkout/cart'), function() {

        test.assertHttpStatus(200);

        test.assertUrlMatch(mage.getUrl('checkout/cart'));
        test.assertExists('.messages .success-msg');
        test.assertElementCount('#shopping-cart-table tbody tr', 1);
        test.assertExists('.cart .totals .checkout-types li button.button');
        test.assertExists('#discount-coupon-form');

    })
    .run(function () {
        test.done();
    });
});

