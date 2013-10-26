// The HREF of the first category level 1
var href = 'furniture.html';

// The test
casper.test.begin('Category Level 1', function suite(test) {

    // Start on the homepage
    casper.start(url, function () {

        this.printTitle();

        // Main nav exists?
        test.assertExists('#nav');

        // Main categories links exists?
        test.assertExists('#nav a.level-top[href="'+ url + href +'"]');
    })

    // Then go to the category's page
    .thenClick('#nav a.level-top', function () {

        this.printTitle();

        // Are we on a category page?
        test.assertExists('body.catalog-category-view');

        // Get the URL of the first link in the menu and compare it with the url
        test.assertUrlMatch(url + href);

        // Test title
        test.assertTitle('Furniture');

        // Products list exist?
        test.assertExists('.category-products');
    })

    .run(function () {
        test.done();
    });
});
