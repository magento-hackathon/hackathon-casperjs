// This test can be used as a basis for creating more advanced tests for the search form
// on the advanced search page

casper.test.begin('Advanced search', function suite(test) {

    // Start on the homepage
    casper.start(mage.getUrl('catalogsearch/advanced'), function() {

        test.assertHttpStatus(200);
        test.assertExists('#form-validate', '#form-validate exists');

        // Enter and select search terms
        this.fill('form#form-validate', {
            'price[from]'    : 20,
            'price[to]'      : 200
        }, false);

        this.fillSelectors('form#form-validate', {
            '#color'        : 24
        }, false);

        // Search button exists?
        test.assertExists('#form-validate > div.buttons-set > button');

        })

    // Click search button and check results
    .thenClick('#form-validate > div.buttons-set > button', function(){
        test.assertHttpStatus(200);
        test.assertExists('.catalogsearch-advanced-result');
        test.assertElementCount('div.col-main > div.category-products li.item', 4, '4 search results');
        })

    .run(function () {
        test.done();
    });
});