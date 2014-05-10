// This test can be used as a basis for creating more advanced tests for the search form
// in the quick access section of the header

casper.test.begin('Catalog search', function suite(test) {

    // Start on the homepage
    casper.start(mage.getBaseUrl(), function () {

        test.assertHttpStatus(200);

        // Search form exists?
        test.assertExists('form#search_mini_form', 'form#search_mini_form exists');

        // Search input field exists?
        test.assertExists('form#search_mini_form input[name="q"]', 'input[name="q"] exists');

        // Enter search term
        this.fill('form#search_mini_form', {
            'q'    : 'Sony'
        }, false);

        // Search button exists?
        test.assertExists('#search_mini_form > div > button');

        })

    // Click search button and check results
    .thenClick('#search_mini_form > div > button', function(){
        test.assertHttpStatus(200);
        test.assertExists('.catalogsearch-result-index');
        test.assertElementCount('div.category-products > ul > li.item', 3, '3 search results for Sony');
        })

    .run(function () {
        test.done();
    });
});