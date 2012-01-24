/*!
 * Ext JS Connect
 * Copyright(c) 2012 ValueClick Inc.
 * MIT Licensed
 */

var argv = require('optimist').argv,
    cluster = require('cluster');

if(cluster.isMaster && argv.clusterize) {
  console.log("I am the master and we've been told to clusterize");
  var numberOfForks;
  var numCPUs = require('os').cpus().length;
  var requestedWorkers = parseInt(argv.clusterize);
  if(requestedWorkers  // checking to see if a number was passed 
  && requestedWorkers  > 0 // we have a minimum of 1 
  && requestedWorkers  <= numCPUs //and a maximum of the available cpus 
  ) {
    // if we passed our filter set to the passed in number of worker forks
    numberOfForks = requestedWorkers; 
  } 
  else {
    // if we didn't pass our filter set to the total number of available forks
    numberOfForks = numCPUs ;
  }
  // fork'em
  for( var i = 0; i < numberOfForks; i ++ ) {
    cluster.fork();
  }
  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died. restart...');
    cluster.fork();
  });
}
