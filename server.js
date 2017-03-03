var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080
  , qs = require('querystring')

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendIndex(res)
      break
    case '/index.html':
      sendIndex(res)
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'scripts.js', 'text/javascript')
      break
    case '/README.md':
	  sendFile(res, 'README.md', 'text/markdown')
	  break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')
  function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html'

    fs.readFile(filename, function(error, content) {
      res.writeHead(200, {'Content-type': contentType})
      res.end(content, 'utf-8')
    })

  }

    function sendIndex(res) {
    var contentType = 'text/html'
    res.writeHead(200, {'Content-type': contentType})
    var contentType = 'text/html'
      , html = ''

    html = html + '<html>'

    html = html + '<head>'
    // You could add a CSS and/or js call here...
    html = html + '<link rel="stylesheet" type="text/css" href="style.css"/>'
    html = html + '</head>'

    html = html + '<body>'

    // Note: the next line is fairly complex. 
    // You don't need to understand it to complete the assignment,
    // but the `map` function and `join` functions are VERY useful for working
    // with arrays, so I encourage you to tinker with the line below
    // and read up on the functions it uses.
    //
    // For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
    html = html + movies.map(function(d) { return '<li>'+d+'</li>' }).join(' ')

    html = html + '</body>'
    html = html + '</html>'
    

    res.writeHead(200, {'Content-type': contentType})
    res.end(html, 'utf-8')
  }