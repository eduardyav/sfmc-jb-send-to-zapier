define([], function(){      
    return {
        "workflowApiVersion": "1.1",
        "icon": "images/icon.png",
        "iconSmall": "images/iconSmall.png", 
        "key": "D4F3B97E-1E12-405E-A9EC170BB6F94A46",
        "partnerApiObjectTypeId": "IXN.CustomActivity.REST",
        "lang": {
            "en-US": {        
                "name": "Send To Zapier",
                "description": "Activity posts the data into the Zapier endpoint."
            }
        },
        "category": "messaging",
        "version": "1.0",
        "apiVersion": "1.0",
        "execute": {
            "uri": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/execute/",
			"inArguments": [],
			"outArguments": [],
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
		},
        "save": {
            "uri": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/save/",
			"verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },
        "publish": {
            "uri": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/publish/",
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },
        "validate": {
            "uri": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/validate/",
            "verb": "POST",
			"body": "",
            "format": "json",
            "useJwt": false,
            "timeout": 3000
        },

        "edit": {
            "uri": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/",
            "height": 400,
            "width": 500
        }
};
});
