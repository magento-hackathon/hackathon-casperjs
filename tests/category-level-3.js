// The HREF of the first category level 2
var href_level2 = 'apparel/shoes.html';
var href = 'apparel/shoes/mens.html';

// The test
casper.test.begin('Category Level 3', function suite(test) {

    // Start on the homepage
    casper.start(url, function () {

        this.printTitle();

        // Main nav exists?
        test.assertExists('#nav');

        // Link exists
        test.assertExists('#nav li.level-top.nav-3 > a');

        // Move the mouse hover the second link
        this.mouse.move('#nav li.level-top.nav-3 > a');

        // Test if the link is "over"
        test.assertExists('#nav li.level-top.nav-3.over');

        // Wait the sub-menu
        this.waitForSelector('#nav .nav-3 ul.shown-sub', function () {

            // Move over the good category link
            this.mouse.move('#nav .nav-3 ul.shown-sub > li.parent > a[href="' + url + href_level2 + '"]');

            // Wait the sub-menu
            this.waitForSelector('#nav .nav-3 ul.shown-sub li.parent ul.shown-sub', function () {

                // Move the mouse on the third link
                this.click('#nav .nav-3 ul.shown-sub li.parent ul.shown-sub > li > a[href="' + url + href + '"]');
            });
        });

    })

    // Then go to the category's page
    .then(function () {

        this.printTitle();

        // Are we on a category page?
        test.assertExists('body.catalog-category-view');

        // Get the URL of the first link in the menu and compare it with the url
        test.assertUrlMatch(url + href);

        // Test title
        test.assertTitle('Mens - Shoes - Apparel');
        test.assertSelectorHasText('.page-title.category-title h1', 'Mens');

        // Products list exist?
        test.assertExists('.category-products');
        test.assertElementCount('.category-products li.item', 3);

        // Test breadcrumbs
        test.assertElementCount('.breadcrumbs ul li', 4);

        // Menu link is active?
        test.assertExists('#nav li.level-top.nav-3.active > a');
    })

    .run(function () {
        test.done();
    });
});
