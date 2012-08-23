[![build status](https://secure.travis-ci.org/chrispaterson/node-clusterstart.png)](http://travis-ci.org/chrispaterson/node-clusterstart)
# Clusterstart
The purpose of this module is to enable an app created in Node.js to run either in cluster or on a signle core.

## Installation
		$ npm install clusterstart

## Commands
clusterstart allows you to import the clusterstart module into your app, then just run it as a cluster.
    $ node app.js --clusterize

It also allows you to specify the number of cores to run it on.
    $ node app.js --clusterize 4

If no number is passed, then it runs on all available cores.  Likewise if the number passed in is more than the available cores, it will default to the available cores.

## Example
    var clusterstart = require('clusterstart'),
			http = require('http');

			http.Server(function(req, res) {
				res.writeHead(200);
				res.end("hello world\n");
			}).listen(8000);

And to run:

    $ node app.js --clusterize

Testing:

There is simple test in the ./tests directory which spins up a server and trys different clusterizing options through child_process

    $ npm test
