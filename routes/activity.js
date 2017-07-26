'use strict';

var util = require( 'util' );
var request = require('request');

exports.logExecuteData = [];

function logData( req ) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
        console.log( "body: " + util.inspect( req.body ) );
        console.log( "headers: " + req.headers );
        console.log( "trailers: " + req.trailers );
        console.log( "method: " + req.method );
        console.log( "url: " + req.url );
        console.log( "params: " + util.inspect( req.params ) );
        console.log( "query: " + util.inspect( req.query ) );
        console.log( "route: " + req.route );
        console.log( "cookies: " + req.cookies );
        console.log( "ip: " + req.ip );
        console.log( "path: " + req.path );
        console.log( "host: " + req.host );
        console.log( "fresh: " + req.fresh );
        console.log( "stale: " + req.stale );
        console.log( "protocol: " + req.protocol );
        console.log( "secure: " + req.secure );
        console.log( "originalUrl: " + req.originalUrl );
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData( req );
    res.send( 200, 'Edit' );
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData( req );
    res.send( 200, 'Save' );
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData( req );
    res.send( 200, 'Publish' );
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData( req );
    res.send( 200, 'Validate' );
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function( req, res ) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData( req );
    res.send( 200, 'Response to Execute' );
    
    var activity = req.body;

    // Since activity.inArguments is of the format  [{"FirstName":"Foo1"},{"LastName":"Spam1"},{"EmailAddress":"foo1.spam@eggs.com"},{"ID":"customevent1"},{"Phone":"15780270981"}]
    // it must be one JSON string
    var inArguments = activity.inArguments;
    var data = {};
    for (var i = 0; i < inArguments.length; i++){
        for(var key in inArguments[i]){
            data[key] = inArguments[i][key];
        }
    }
    //var data = { "FirstName": "Test", "LastName": "User", "EmailAddress": "test.user@spotcap.com", "ID": "customevent", "Phone": "15780270989" };
    
    var headers = {'User-Agent': 'sfmc-activity-zapier'};
    var webhookUrl = "https://hooks.zapier.com/hooks/catch/1394115/5st452/";
    console.log( "POST request to " + webhookUrl + " with body: " + JSON.stringify(data));
    executeHttpRequest(webhookUrl, "POST", headers, data, "json");
    console.log( "Execute POST request done.");
};

function executeHttpRequest(url, method, headers, data, dataType) {
    var options = {
		url: url,
		method: method,
		headers: headers,
        json: data
	};
    request(options, function (err, resp, body) {	
		if(!err) {
			if(resp.statusCode === 200) {
				console.log( "request Ok");
			}
			else {
                console.log( "request Invalid Status Code:"  + resp.statusCode);

			}
		}
		else {
			console.log( "request error" + err);
		}
	});
}

