const http = require('http');
const { Tree2D } = require('./tree');

const hostname = '0.0.0.0';
const port = 3001;
const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/javascript');
  var testTree2D = new Tree2D()
testTree2D.makeInstructions()
testTree2D.makeBranches()
  res.end("window.branches = " + JSON.stringify(testTree2D.branches))
});
server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});