# Frontend tests on Magento with CasperJS

## Prerequisites

*   Install [PhantomJS][phantomjs]
*   Install [CasperJS][casperjs]

## Howto run the tests

Just run the command below:

    casperjs --pre=config.js test tests/ --url="http://my-store.com/"

You just need to replace the `http://my-store.com` with your own store's URL.

### Secure URL

If you want to set a different URL used for HTTPS please add the url like that:

    --secure_url="https://my-store.com/"

Maybe you're using a self signed certificate. In this case add the following parameter:

    --ignore-ssl-errors=yes


[casperjs]: http://casperjs.org
[phantomjs]: http://phantomjs.org
