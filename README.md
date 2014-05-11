# Frontend tests on Magento with CasperJS

## Introduction

The tests located in the tests directory work with a default Magento CE installation with sample data installed. The idea is that if you have a custom project you will duplicate those tests in a separate directory and make the necessary adjustments so that the tests pass with your custom theme, extensions and custom modifications.

If you develop new generic tests, please contribute them back to this project by either coming to a Magento Hackathon and requesting write access to this repository or by forking it and submitting a pull request.

## Prerequisites

*   Install [PhantomJS][phantomjs]
*   Install [CasperJS][casperjs]

## Howto run the tests

Just run the command below:

    casperjs --pre=config.js test --url="http://my-store.com/" tests/

or for simple tests with default values

    npm test --url="http://my-store.com/"

You just need to replace the `http://my-store.com` with your own store's URL.

If you don't have URL rewrites enabled, don't forget to add index.php to your URL.

### Secure URL

If you want to set a different URL used for HTTPS please add the url like that:


    --secure_url="https://my-store.com/"

Maybe you're using a self signed certificate. In this case add the following parameter:

    --ignore-ssl-errors=yes

### Admin URL

If you're using a different admin path, you can specify it like so:

    --admin_url="https://my-store.com/index.php/secretpath/"

### Debug

If you want a verbose mode, just add:

    --verbose

#### Remote Debugging

Remote Debugging allows you to debug the testing script using the WebKit Inspector. This feature is only available for WebKit-based Browsers like Safari and Chrome.

You can easily remote debug the scripts using the command  `--remote-debugger-port=9000`.

    your@machine:/casperjs --pre=config.js --remote-debugger-port=9000 sample.js

 It is up to you to choose any port of your choice. When running the remote debugger, it is important that you know your ip. My IP in this case is for example 192.168.162.134

    your@machine:/srv/hackathon$ ifconfig
    eth0      Link encap:Ethernet  Hardware Adresse
    00:0c:29:53:ea:00    inet Adresse:192.168.162.134

Now open any webkit browser on your LOCAL machine and type in ip:port for example:

    192.168.162.134:9000

The debugger can now be run by typing in the command `__run()` at the console after clicking the first link on the page.

### Troubleshooting

If you get this error

    CasperError: Can't find module underscore

you need to run

    npm install

which will install the required node underscore module.

[casperjs]: http://casperjs.org
[phantomjs]: http://phantomjs.org
