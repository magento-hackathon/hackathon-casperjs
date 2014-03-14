# Frontend tests on Magento with CasperJS

## Prerequisites

*   Install [PhantomJS][phantomjs]
*   Install [CasperJS][casperjs]

## Howto run the tests

Just run the command below:

    casperjs --pre=config.js test --url="http://my-store.com/" tests/

or for simple tests with default values

    npm test --url="http://my-store.com/"

You just need to replace the `http://my-store.com` with your own store's URL.

### Secure URL

If you want to set a different URL used for HTTPS please add the url like that:

    --secure_url="https://my-store.com/"

Maybe you're using a self signed certificate. In this case add the following parameter:

    --ignore-ssl-errors=yes

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


[casperjs]: http://casperjs.org
[phantomjs]: http://phantomjs.org
