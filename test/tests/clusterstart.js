var test = require("tap").test,
    exec = require('child_process').exec;

test('clusterstart', { skip:false }, function (t) {
  t.plan(12);
  t.ok(true, "true is ok -- all is right with the universe.  Our current working directory: "+process.cwd());
  t.equal(true, true, "true == true -- all is right with the universe");

  // now spin up server in our fixtures dir
  
  exec('node ../fixtures/testserver.js', function(error, stdout, stderr) {
    var expl = stdout.split('\n');
    t.equal(error, null, 'error was null');
    t.equal(expl.length, 2, 'we started two processes because we didn\'t pass the --clusterize option');


    exec('node ../fixtures/testserver.js --clusterize', function(error, stdout, stderr) {
      expl = stdout.split('\n');
      var numCPUs = require('os').cpus().length;
      t.equal(error, null, 'error was null');
      t.equal(expl.length, numCPUs + 2, '--clusterize option and got the same number of servers started as the available CPUs');


      exec('node ../fixtures/testserver.js --clusterize 2', function(error, stdout, stderr) {
        expl = stdout.split('\n');
        t.equal(error, null, 'error was null');
        t.equal(expl.length, 4, '--clusterize 2 option and got two servers started');


        exec('node ../fixtures/testserver.js --clusterize '+(numCPUs + 2), function(error, stdout, stderr) {
          expl = stdout.split('\n');
          t.equal(error, null, 'error was null');
          t.equal(expl.length, numCPUs + 2, '--clusterize option with '+(numCPUs + 2)+' which is more than our available CPUs of '+numCPUs+' and it defaulted to using only the available CPUs');


          exec('node ../fixtures/testserver.js --clusterize foo', function(error, stdout, stderr) {
            expl = stdout.split('\n');
            t.equal(error, null, 'error was null');
            t.equal(expl.length, numCPUs + 2, '--clusterize option with foo which is not a valid option because it is a string and not a number and it defaulted to using only the available CPUs');
          })
        })
      })
    })
  });


});
