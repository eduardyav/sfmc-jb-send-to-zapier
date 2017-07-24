'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var http        = require('http');
var JWT         = require('./lib/jwtDecoder');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

var app = express();

// Register configs for the environments where the app functions
// , these can be stored in a separate file using a module like config
var APIKeys = {
    appId           : '4642baf4-92f9-4f9e-aa3e-05f656ff41ea',
    clientId        : 'bpu8w3rzpme2hx38kjz9ejdg',
    clientSecret    : 'GwAtg1NqXHwRLs5wbE5sphoQ',
    appSignature    : 'hyyvspw3fufowdyubtbmptnhlqv13dd4wrelb31xg3b5ei5zmtmqsqur3xpylqwaf35svyg2tlebw033xfsmks4mdzkuv1xhohjsrqmzizleum5tkclyr2qo131hq3vp1fyipy5y3v0wbc4exanj0gvionmin1315kyd5dyhsecbzzjbc4zihg2nr1fuhccaix2mzykb5io5l32dirsccwhjhjsu4xcf2cqkw4ozt4z0zktkuxgvapl4repjvif',
    authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
};

// Simple custom middleware
function tokenFromJWT( req, res, next ) {
    // Setup the signature for decoding the JWT
    var jwt = new JWT({appSignature: APIKeys.appSignature});
    
    // Object representing the data in the JWT
    var jwtData = jwt.decode( req );

    // Bolt the data we need to make this call onto the session.
    // Since the UI for this app is only used as a management console,
    // we can get away with this. Otherwise, you should use a
    // persistent storage system and manage tokens properly with
    // node-fuel
    req.session.token = jwtData.token;
    next();
}

// Use the cookie-based session  middleware
app.use(express.cookieParser());

// TODO: MaxAge for cookie based on token exp?
app.use(express.cookieSession({secret: "SendToZapier-CookieSecret"}));

// Configure Express
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', tokenFromJWT, routes.login );
app.post('/logout', routes.logout );

// Custom Activity Routes
app.post('/jb/activities/send-to-zapier/save/', activity.save );
app.post('/jb/activities/send-to-zapier/validate/', activity.validate );
app.post('/jb/activities/send-to-zapier/publish/', activity.publish );
app.post('/jb/activities/send-to-zapier/execute/', activity.execute );

app.get('/clearList', function( req, res ) {
	// The client makes this request to get the data
	activity.logExecuteData = [];
	res.send( 200 );
});

// Used to populate events which have reached the activity in the interaction we created
app.get('/getActivityData', function( req, res ) {
	// The client makes this request to get the data
	if( !activity.logExecuteData.length ) {
		res.send( 200, {data: null} );
	} else {
		res.send( 200, {data: activity.logExecuteData} );
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
