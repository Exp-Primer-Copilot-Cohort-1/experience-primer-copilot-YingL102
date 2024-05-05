// Create web server
// 1. Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var comments = [];

// 2. Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        pathname = '/index.html';
    }

    if (pathname == '/index.html') {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, 'Not Found', { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>');
            } else {
                response.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (pathname == '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        response.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
        response.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, 'Not Found', { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>');
            } else {
                response.writeHead(200, 'OK', { 'Content-Type': mime.lookup(pathname) });
                response.end(data);
            }
        });
    }
});

// 3. Listen on port 8000, IP defaults to