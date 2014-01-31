# SETUP

## Overview

## Preparation / Installation
Before you can begin with testing your application, you need to install the required packages. In this case phantom.js and casper.js.

### PhantomJS

You can download the most stable release at <http://phantomjs.org/download.html>. Download and extract it on your webserver. For example you can extract it in `/opt`.
	
	your@machine:/opt/phantomjs-1.9.2-linux-x86_64$ ls
	bin  ChangeLog  examples  LICENSE.BSD  README.md  
	your@machine:/opt/phantomjs-1.9.2-linux-x86_64$
	
After that, ensure that a proper symbolic link is set in /usr/bin (or any other directory of your choice)

	your@machine:/usr/bin$ln -s /opt/phantomjs-1.9.2-linux-x86_64/bin/phantomjs

### CasperJS

CasperJS works on top of PhantomJS, so there is no need to include it as a JavaScript-Resource. Instead you can call casperjs directly as a binary. Download the most stable release at <http://casperjs.org/> and extract it on your webserver. Follow the same steps as for PhantomJS and create a symbolic link at `/usr/bin`.

## Running
Running a casperjs testing script is very easy. Write a script.  
Look the README!

