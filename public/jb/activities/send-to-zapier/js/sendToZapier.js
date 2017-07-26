define( function( require ) {
	var Postmonger = require( 'postmonger' );
	var $ = require( 'vendor/jquery.min' );

    var connection = new Postmonger.Session();
    var toJbPayload = {};
	var tokens;
	var endpoints;
    
    $(window).ready(onRender);
    
    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteractionDefaults');
    };
    
    connection.on('initActivity', function(payload) {
        if (payload) {
            toJbPayload = payload;
            console.log('payload', toJbPayload);
        }
    });
    
    
    connection.on('requestedInteractionDefaults', function(settings) { 
        if( settings.error ) {
			console.error( settings.error );
		} else {
			defaults = settings;
		}
        console.log('defaults', defaults);
        var eventKey = retrieveKey(defaults.email[0]);
        console.log('EventKey', eventKey);
    });
    
    // Assume that the string of the format 
    // '{{Event.ContactEvent-72af1529-1d7d-821e-2a08-34fb5068561d."EmailAddress"}}'
    // It will return 'ContactEvent-72af1529-1d7d-821e-2a08-34fb5068561d'
    // Otherwise null
    function retrieveKey (string) {
        var pos1 = string.indexOf(".");
        var pos2 = string.indexOf(".", pos1);
        var result = string.substring(pos1, (pos2 - 1) );
        return result;
    }
    
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

    connection.on('clickedNext', function() {
        save();
        connection.trigger('ready');
    });
    
    function save() {
        toJbPayload.metaData.isConfigured = true;
        connection.trigger('updateActivity', toJbPayload);
    };
    
    connection.on('updateActivity', function(payload) {
            console.log('updated payload', payload);
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
