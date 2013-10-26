# Frontend tests on Magento with CasperJS

## Prerequisites

*   Install [PhantomJS][phantomjs]
*   Install [CasperJS][casperjs]

## Howto run the tests

Just run the command below:

    casperjs --pre=config.js test tests/ --url="http://my-store.com/"

You just need to replace the `http://my-store.com` with your own store's URL.

[casperjs]: http://casperjs.org
[phantomjs]: http://phantomjs.org