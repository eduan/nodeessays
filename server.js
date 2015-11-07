var port = 8080;
var output = '';
var http = require('http');

exports.end = function() {
    console.log('Initializing Server on 0.0.0.0:' + port);
    http.createServer(function(request, response){
        response.writeHead(200, {'Content-Type' : 'text/plain'});
        response.write(output);
        response.end();
    }).listen(port);
};

exports.echo = function(stream) {
    output += stream; 
    return this;
};

exports.setPort = function(portParam) {
    port = port; 
};
