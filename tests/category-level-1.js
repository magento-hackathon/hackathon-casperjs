// The HREF of the first category level 1
var href = 'furniture.html';

// The test
casper.test.begin('Category Level 1', function suite(test) {

    // Start on the homepage
    casper.start(mage.getBaseUrl(), function () {

        test.assertHttpStatus(200);

        // Main nav exists?
        test.assertExists('#nav');

        // Main categories links exists?
        test.assertExists('#nav a.level-top[href="'+ mage.getDirectUrl(href) +'"]');

        // Move the mouse on the link
        this.mouse.move('#nav a.level-top');

        // Wait the submenu
        this.waitForSelector('#nav .nav-1 ul.shown-sub', function () {
            test.assertExists('#nav .nav-1 ul.shown-sub');

            // Click the link
            this.click('#nav .nav-1 a.level-top');
        });
    })

    // Then go to the category's page
    .then(function () {

        test.assertHttpStatus(200);

        // Are we on a category page?
        test.assertExists('body.catalog-category-view');

        // Get the URL of the first link in the menu and compare it with the url
        test.assertUrlMatch(mage.getDirectUrl(href));

        // Test title
        test.assertTitle('Furniture');

        // Products list exist?
        test.assertExists('.category-products');

        // Menu link is active?
        test.assertExists('#nav li.level-top.nav-1.active > a');
    })

    .run(function () {
        test.done();
    });
});
