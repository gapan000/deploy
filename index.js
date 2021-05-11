const http = require('http')
const auth = require('basic-auth')
const compare = require('tsscmp')
const deploy = require("./scripts/foetusfood-backoffice");
const fs = require('fs');

// Create server
var server = http.createServer(function (req, res) {
    var credentials = auth(req)

    // Check credentials
    // The "check" function will typically be against your user store
    if (!credentials || !check(credentials.name, credentials.pass)) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="deploy foetusfood"')
        res.end('Access denied')
    } else {
	    deploy();
	    res.end("starting deployment");
        //res.end(deploy());
    }
})

// Basic function to validate credentials for example
function check (name, pass) {
    var valid = true

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, 'branlicot') && valid
    valid = compare(pass, 'br4nl1c0t') && valid

    return valid
}

// Listen
server.listen(3000)
