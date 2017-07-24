define( function( require ) {
	var Postmonger = require( 'postmonger' );
	var $ = require( 'vendor/jquery.min' );

    var connection = new Postmonger.Session();
	var tokens;
	var endpoints;

    console.log('Testing');
    
    $(window).ready(function() {
        connection.trigger('ready');
		connection.trigger('requestTokens');
		connection.trigger('requestEndpoints');
    }) 
    
	// This listens for Journey Builder to send tokens
	// Parameter is either the tokens data or an object with an
	// "error" property containing the error message
    connection.on('requestedTokens', function( data ) {
		if( data.error ) {
			console.error( data.error );
		} else {
			tokens = data;
		}
        console.log('tokens', tokens);
	});
    
	// This listens for Journey Builder to send endpoints
	// Parameter is either the endpoints data or an object with an
	// "error" property containing the error message
	connection.on('requestedEndpoints', function( data ) {
		if( data.error ) {
			console.error( data.error );
		} else {
			endpoints = data;
		}
        console.log('endpoints', endpoints);
	});

    connection.on('requestPayload', function() {
	 var payload = {};
 
        payload.options = {};

		//TODO: Shouldn't this come from the data?
        payload.flowDisplayName = 'Send To Zapier';
 
        payload.metaData.isConfigured = true;
 
        console.log('payload', payload);
        
        connection.trigger('getPayload', payload);
        
    });

	// Journey Builder broadcasts this event to us after this module
	// sends the "ready" method. JB parses the serialized object which
	// consists of the Event Data and passes it to the
	// "config.js.save.uri" as a POST
    connection.on('populateFields', function(payload) {});

});
