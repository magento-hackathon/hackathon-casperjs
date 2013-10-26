# SETUP

## Overview

## Preparation / Installation
Before you can begin with testing your application, you need to install the required packages. In this case phantom.js and casper.js

### PhantomJS

You can download the most stable release at <http://phantomjs.org/download.html>. Download and extract it on your webserver. For example you can extract it in /opt. 
	
	your@machine:/opt/phantomjs-1.9.2-linux-x86_64$ ls
	bin  ChangeLog  examples  LICENSE.BSD  README.md  
	your@machine:/opt/phantomjs-1.9.2-linux-x86_64$
	
After that, ensure that a proper symbolic link is set in /usr/bin (or any other directory of your choice)

	your@machine:/usr/bin$ln -s /opt/n1k0-casperjs-cd1fab5/bin/casperjs casperjs
	
	
### CasperJS

CasperJS works on top of PhantomJS, so there is no need to include it as a JavaScript-Resource. Instead you can call casperjs directly as a binary. Download the most stable release at <http://casperjs.org/> and extract it on your webserver. Follow the same steps as for PhantomJS and create a symbolic link at /usr/bin.


## Running
Running a casperjs testing script is very easy. Write a script 

## Remote Debugging

Remote Debugging allows you to debug the testing script using the WebKit Inspector. This feature is only available for WebKit-based Browsers like Safari and Chrome.

You can easily remote debug the scripts using the command  --remote-debugger-port=9000.

	your@machine:/casperjs --pre=config.js  --remote-debugger-port=9000 sample.js

 It is up to you to choose any port of your choice. When running the remote debugger, it is important that you know your ip. My IP in this case is for example 192.168.162.134
 
 	your@machine:/srv/hackathon$ ifconfig
	eth0      Link encap:Ethernet  Hardware Adresse
	00:0c:29:53:ea:00	inet Adresse:192.168.162.134 
	
Now open any webkit browser on your LOCAL machine and type in ip:port for example:

	192.168.162.134:9000
	
The debugger can now be run by typing in the command __run() at the console after clicking the first link on the page.