casper.test.begin('Checkout as a guest', function suite(test) {

    casper.on('remote.message', function(msg) {
      this.echo(msg);
    });

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
        this.click('.btn-checkout');
    })

    .waitForUrl(mage.getUrl('checkout/onepage'), function() {
        test.assertHttpStatus(200);
        test.assertExists('input[name="checkout_method"]');
        test.assertExists('#onepage-guest-register-button');
        
        this.evaluate(function() {
            document.getElementById('login:guest').checked = true;
            checkout.setMethod();
        });
        test.pass('Try to go trough checkout as Guest');
    })

    /* Billing address step */
    .waitUntilVisible('#opc-billing', function() {
        test.assertExists('input[name="billing[firstname]"]');
        test.assertExists('input[name="billing[lastname]"]');
        test.assertExists('input[name="billing[company]"]');
        test.assertExists('input[name="billing[email]"]');
        test.assertExists('input[name="billing[street][]"]');
        test.assertExists('input[name="billing[city]"]');
        test.assertExists('select[name="billing[region_id]"]');
        test.assertExists('input[name="billing[postcode]"]');
        test.assertExists('select[name="billing[country_id]"]');
        test.assertExists('input[name="billing[telephone]"]');
        test.assertExists('input[name="billing[fax]"]');
        test.assertExists('input[name="billing[use_for_shipping]"]');
        this.fill('form#co-billing-form', {
            'billing[firstname]'    : login_user_firstname,
            'billing[lastname]'     : login_user_lastname,
            'billing[company]'      : user_address_company,
            'billing[email]'        : login_user_username,
            'billing[street][]'     : user_address_street,
            'billing[city]'         : user_address_city,
            'billing[postcode]'     : user_address_postcode,
            'billing[telephone]'    : user_address_telephone,
            'billing[fax]'          : user_address_fax
        }, false);

        /* Set country and region_id dropdowns */
        this.evaluate(function(regionId, countryId) {
            function setSelectedValue(selectObj, valueToSet) {
                for (var i = 0; i < selectObj.options.length; i++) {
                    if (selectObj.options[i].text== valueToSet) {
                        selectObj.options[i].selected = true;
                        return;
                    }
                }
            }

            try {
                var regionIdObject = document.getElementById('billing:region_id');
                var countryIdObject = document.getElementById('billing:country_id');
                
                setSelectedValue(regionIdObject, regionId);
                setSelectedValue(countryIdObject, countryId);

                document.getElementById('billing:use_for_shipping_yes').checked = true;
                billing.save();
            } catch (err) {
                console.log(err);
            }
        }, { regionId: user_address_region, countryId: user_address_country });
        test.pass('Filling the billing address form and use this address as shipping');
    })

    /* Shipping method step */
    .waitUntilVisible('#checkout-step-shipping_method', function() {
        test.assertExists('.sp-methods');
        this.evaluate(function() {
            shippingMethod.save();
        });
        test.pass('Using flat rate as shipping method');
    })

    /* Payment method step */
    .waitUntilVisible('#checkout-step-payment', function() {
        this.evaluate(function() {
            document.getElementById('p_method_checkmo').checked = true;
            payment.save();
        });
        test.pass('Using "Check / Money order" as payment method');
    })

    /* Order review step */
    .waitUntilVisible('#checkout-step-review', function() {
        test.assertExists('#checkout-review-table');
        test.assertExists('button.btn-checkout');
        this.click('button.btn-checkout');
        test.pass('Placing the order');
    })

    /* Order success page */
    .waitForUrl(mage.getUrl('checkout/onepage/success'), function() {
        test.assertHttpStatus(200);
        test.assertExists('.checkout-onepage-success');
        test.pass('The order has been placed successfully');
    })

    .run(function () {
        test.done();
    });
});