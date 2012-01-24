# Clusterize
The purpose of this module is to enable an app created in Node.js to run either in cluster or on a signle core.

## Installation
		$ npm install node-clusterize

## Commands
clusterize allows you to import the clusterize module into your app, then just run it as a cluster.
		$ node app.js --clusterize

It also allows you to specify the number of cores to run it on.
		$ node app.js --clusterize 4

If no number is passed, then it runs on all available cores.  Likewise if the number passed in is more than the available cores, it will default to the available cores.
