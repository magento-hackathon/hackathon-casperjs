casper.test.begin('Category Level 1', function suite(test) {

    // Start on the homepage
    casper.start(url, function () {

        this.printTitle();

        // Main nav exists?
        test.assertExists('#nav');

        // Main categories links exists?
        test.assertExists('#nav a.level-top');
    })

    // Then go to the category's page
    .thenClick('#nav a.level-top', function () {

        this.printTitle();

        // Are we on a category page?
        test.assertExists('body.catalog-category-view');

        // Get the URL of the first link in the menu and compare it with the url
        var href = this.evaluate(function () {
            return document.querySelector('#nav a.level-top').href;
        });
        test.assertUrlMatch(href);

        // Products list exist?
        test.assertExists('.category-products');
    })

    .run(function () {
        test.done();
    });
});

