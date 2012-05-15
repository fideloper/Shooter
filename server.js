//node ~/Sites/server.js
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
*/
var sys = require("util"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

http.createServer(function(request, response) {
//console.log(request);//console.log(response);
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    var req = false;
	
    path.exists(filename, function(exists) {
    	if(!exists) {
    		response.writeHead(404, {"Content-Type": "text/plain"});
    		response.write("404 Not Found\n");
    		response.end();
    		return;
    	}

    	fs.readFile(filename, "binary", function(err, file) {
    		if(err) {
    			//If is directory, fallback to 'site index'
    			if(err.errno == 21) {
    				req = http.request({host:'localhost',port:8080,path:'/index.html',method:'GET'}, function(res) {
    					res.on('data', function(chunk) { 
      						response.writeHead(200, {'Content-Type': 'text/html'});
    						response.write(chunk, 'binary'); //vs response.write(''+chunk); to cast as String
    						response.end();
    					});
    				});
    				req.end();
    				return;
    			}
    			
    			response.writeHead(500, {"Content-Type": "text/plain"});
    			response.write(err + "\n");
    			response.end();
    			return;
    		}
			
    		response.writeHead(200, {'Content-Type': 'text/html'});
    		response.write(file, "binary");
    		response.end();
    	});
    });
}).listen(8080);

sys.puts("Server running at http://localhost:8080/");