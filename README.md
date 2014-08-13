# Customized Deliteful Builds
## About
This repository contains the [Deliteful](http://ibm-js.github.io/deliteful/) sample app created using [Yeoman](https://github.com/yeoman/yeoman) (`yo deliteful-app`) and integrates [grunt-amd-build](https://github.com/ibm-js/grunt-amd-build) to create a customized build.

There are still some pitfalls so I adjusted the build configuration and directory structure to simplify the process and allow successful builds. See the commit history for technical details concerning the problems I have encountered.

## Getting started
The [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) build tool utilizes [Grunt](http://gruntjs.com/) which runs on [Node.js](http://nodejs.org/). You need to install Node.js and its package manager [NPM](https://www.npmjs.org/) first if they are not available on your system, yet. Afterwards run `npm install` to install additional dependencies. Now you can build the sample app by simply invoking `grunt`. The built version is created in the `out/` directory.

## Known issues
* Google Chrome throws a TypeError if dcl/dcl is included in the build layer
* an empty css top-level directory has to exist for the build to work
* CSS code for transitions is not included in the build layer
* the module requirejs-text/text has do be explicitly added to the build layer
