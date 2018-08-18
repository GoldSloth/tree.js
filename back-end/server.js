const TC = require('./tree.js')
tree = new TC.Tree2D()
tree.makeInstructions()
tree.makeBranches()

const http = require('http');
const hostname = '127.0.0.1';
const port = 3001;
const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
//  res.end('Hello World');
    res.end(JSON.stringify(tree.branches))
});
server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});