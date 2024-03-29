var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback, path) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (asset === '/styles.css') {
    exports.headers['Content-Type'] = 'text/css';
  } else {
    exports.headers['Content-Type'] = 'text/html';
  }
  
  fs.readFile(path + asset, 'utf8', (err, data) => {
    if (err) {
      console.log('error, asset: ' + asset + ' does not exist.');
      res.writeHead(404, exports.headers);
      res.end('404 Not found');
    } else {
      if (asset === '/loading.html') {
        res.writeHead(302, exports.headers);  
      } else {
        res.writeHead(200, exports.headers);
      }
      res.end(data);
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!


