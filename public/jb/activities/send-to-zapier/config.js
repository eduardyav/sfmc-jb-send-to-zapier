define([], function(){      
    return {
        
           "workflowApiVersion": "1.0",
    "metaData": {
        "icon": "images/sms.png",
        "iconSmall": "images/smsSmall.png",
        "category": "customer"
    },
    "type": "REST",
    "lang": {
        "en-US": {
            "name": "Send To Zapier",
            "description": "A custom Journey Builder activity for sending contact's data to Zapier endpoint. Version 1.0"
        }
    },
    "arguments": {
        "execute": {
            "inArguments": [
                { "firstName":"{{Contact.Attribute.TEST_CUSTOM_EVENT_DE.FirstName}}" },
                { "lastName":"{{Contact.Attribute.TEST_CUSTOM_EVENT_DE.LastName}}" },
                { "emailAddress": "{{Contact.Attribute.TEST_CUSTOM_EVENT_DE.EmailAddress}}" },
                { "id":"{{Contact.Attribute.TEST_CUSTOM_EVENT_DE.ID}}" },
                { "phone":"{{Contact.Attribute.TEST_CUSTOM_EVENT_DE.Phone}}" }
            ],
            "outArguments": [
            ],
            "url": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/execute/"
        }
    },
    "configurationArguments": {
       "applicationExtensionKey": "D4F3B97E-1E12-405E-A9EC170BB6F94A46",
       "save": {
           "url": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/save/"
       },
       "publish": {
           "url": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/publish/"
       },
       "validate": {
           "url": "https://zapier-jb-test.herokuapp.com/jb/activities/send-to-zapier/validate/"
       }
    },
    "userInterfaces": {
        "configModal": {
            "height": 200,
            "width": 300,
            "fullscreen": true
        }
    } 
        
    };
});