// The HREF of the first category level 2
var href = 'electronics/cell-phones.html';

// The test
casper.test.begin('Category Level 2', function suite(test) {

    // Start on the homepage
    casper.start(mage.getBaseUrl(), function () {

        test.assertHttpStatus(200);

        // Main nav exists?
        test.assertExists('#nav');

        // Link exists
        test.assertExists('#nav li.level-top.nav-2 > a');

        // Move the mouse hover the second link
        this.mouse.move('#nav li.level-top.nav-2 > a');

        // Test if the link is "over"
        test.assertExists('#nav li.level-top.nav-2.over');

        // Wait the sub-menu
        this.waitForSelector('#nav .nav-2 ul.shown-sub', function () {

            // Move over the good category link
            this.mouse.move('#nav .nav-2 ul.shown-sub > li > a[href="' + mage.getDirectUrl(href) + '"]');

            // Wait the sub-menu
            this.waitForSelector('#nav .nav-2 ul.shown-sub > li > a[href="' + mage.getDirectUrl(href) + '"].over', function () {
                // Click on the link
                this.click('#nav .nav-2 ul.shown-sub > li > a[href="' + mage.getDirectUrl(href) + '"]');
            });
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
        test.assertTitle('Cell Phones - Electronics');
        test.assertSelectorHasText('.page-title.category-title h1', 'Cell Phones');

        // Products list exist?
        test.assertExists('.category-products');
        test.assertElementCount('.category-products li.item', 6);

        // Test breadcrumbs
        test.assertElementCount('.breadcrumbs ul li', 3);

        // Menu link is active?
        test.assertExists('#nav li.level-top.nav-2.active > a');
    })

    .run(function () {
        test.done();
    });
});
