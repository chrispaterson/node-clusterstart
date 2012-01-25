var http = require('http'),
    clusterstart = require('../../index');

http.Server(function(req, res) {
      res.writeHead(200);
      res.end("hello world\n");
  }).listen(8321);
console.log('server started on port 8321');
process.exit(0);
