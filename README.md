# SFMC Journey Builder
## Custom Activity - Send To Zapier

**NOTE:** You will not be able to run this locally. It is intended to be ran on a publicly available web server/cloud only.

### Pre-Requisites

* A Salesforce Marketing Cloud account
* Journey Builder and all associated applications  must be provisioned into this account
* A publicly accessible web server or cloud
* Web Server or Cloud MUST support SSL
* A valid App Center Developer Account
* Understanding of client-server communications, JavaScript, HTML(5), Node.js and Express

### How To Use

#### Creating a base app in App Center

1. Login to your [App Center account] (https://appcenter-auth.s1.marketingcloudapps.com/)

2. Select "Create New App"

5. Select "Package" as the template type and use the following properties:
    
    * Category: HubExchange
    * Name: <YOUR_APP_NAME>
    * Description: <DESCRIBE_WHAT_APP_IS_DOING>
    * Package: &lt;THIS MUST BE UNIQUE ACROSS ALL OF SFMC&gt

    * Application Endpoints: The base is your publicly accessible web server's endpoint for this app, this can be updated later, MUST BE OVER SSL
        * Login URL: <YOUR_APP_ENDPOINT>/login
        * Logout URL: <YOUR_APP_ENDPOINT>/logout
        * Redirect URL: <YOUR_APP_ENDPOINT>/

6. Integrate your app with an Account (Business Unit)

7. Data Access: No (SSO Only)

8. Make sure everything is correct, and finish

9. If everything is successful, you should see a message saying so. Stay on this screen

#### Copying App Center Data

1. Open app.js file in the root folder

2. Copy the values from the App Center into this section of code in app.js

<code>
<pre>
    var APIKeys = {
        appId           : '__insert_your_app_id__',
        clientId        : '__insert_your_app_client_id__',
        clientSecret    : '__insert_your_app_client_secret__',
        appSignature    : '__insert_your_app_signature__',
        authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
    };
</pre>
</code>

#### Web Server

1. At this point we're going to need the endpoint for our app and subsequently each app extension

2. If you're using Heroku, create a new app and copy the endpoint.

#### Defining our Trigger App Extension
1. In App Center on Code@, with your newly created app open, scroll to the bottom of the page

2. Click "Create a new Interaction Studio Trigger" (we'll be renaming this soon)

3. Properties:
    * Name: Hello World
    * Key: jb-hello-world-trigger-yourname (Replace yourname with your first and last name, if I am John Smith: johnsmith. This ensures your key is unique)
    * Description: Hello World Trigger
    * Endpoint URL: https://&lt;webserver-endpoint&gt;/ixn/triggers/hello-world (no trailing slash)
    * Help URL: https://&lt;webserver-endpoint&gt;/ixn/triggers/hello-world/help (no trailing slash)
    * Help Description: Hello World Trigger Help
    * Category: Trigger
    * Public Extension: This application and all other installed applications
    * Upload Icon: Choose the icon in: /public/ixn/triggers/hello-world/images/

4. Save

#### Updating the code to reflect our new Custom Trigger
1. Open /public/ixn/triggers/hello-world/config.json

2. Copy the "Key" property from your App Extension Custom Trigger and paste it into config.json.key value

3. Open /app.js

4. In the fireEvent handler, insert the name of your Trigger's key in place of the value for: triggerIdFromAppExtensionInAppCenter 

5. **NOTE: Step 5 IS NOT required, except in cases where the Custom Trigger DE has been associated to the Contact Model and the "Advanced" development flow of implementing Contact Filter Criteria is needed** There is a filter definition XML which requires setup and custom values in [this custom trigger JS file](https://github.com/ExactTarget/journey-builder-custom-hello-world/blob/master/public/ixn/triggers/hello-world/js/helloWorldTrigger.js). What you see inside there now needs updating, please read [MyEvent.js Filter XML property](https://code.exacttarget.com/marketing-automation/journey-builder/interactions/triggers/custom-triggers) section on Code@ for more information about this piece of your custom trigger.

#### Defining our Activity App Extension
1. In App Center on Code@, with your newly created app open, scroll to the bottom of the page

2. Click "Create a new Interaction Studio Activity" (we'll be renaming this soon)

3. Properties:
    * Name: Hello World Activity
    * Key: jb-hello-world-activity-yourname (Replace yourname with your first and last name, if I am John Smith: johnsmith. This ensures your key is unique)
    * Description: Hello World Activity
    * Endpoint URL: https://&lt;webserver-endpoint&gt;/ixn/activities/hello-world (no trailing slash)
    * Help URL: https://&lt;webserver-endpoint&gt;/ixn/activities/hello-world/help (no trailing slash)
    * Help Description: Hello World Trigger Help
    * Category: Message
    * Public Extension: This application and all other installed applications
    * Upload Icon: Choose the icon in: /public/ixn/activities/hello-world/images/

4. Save

#### Updating the code to reflect our new App Extensions
1. Open /public/ixn/activities/hello-world/config.js

2. Copy the "Key" property from your App Extension Custom Activity and paste it into config.js.key value

3. Replace the "__insert_your_custom_activity_endpoint__" with your web server's endpoint throughout the file.

#### Re-deploy application to host
Now that you have updated your configurations to point to the appropriate ExactTarget resources, push your changes.


#### Testing our app loads in the Marketing Cloud
1. Log into the [Marketing Cloud](https://mc.exacttarget.com/cloud)

2. From the App Switcher, choose "Hello World"

3. We should see the Hello World HubExchange app interface

#### Defining our Custom Trigger in Trigger Admin
1. Log into the [Marketing Cloud](https://mc.exacttarget.com/cloud)

2. Choose Marketing Automation -> Journey Builder

3. While viewing the Journey Builder Dashboard, we should be able to select "Trigger Administration" and see our new trigger in the list

#### Creating our Custom Activity in Journey Builder
1. Drag the "Hello World" activity from the list onto the Interaction Canvas

2. Hover and click the "Configure" button

3. The Hello World Activity dialog should appear (this is loading from your app)

4. Click save

5. The Activity is configured.

#### Testing our Custom Interaction
1. Select "Hello World" from the App Switcher on the Marketing Cloud

2. Enter an email that exists in your subscriber list

3. Enter the exact value as you entered in Creating our Custom Trigger in Journey Builder, step 4

4. Click "Fire the Event"

5. Events will come through the wire and post to the "Event List"

6. Click the "Get Latest Results" button and you should see the latest responses which have reached the "Activity"

## Licensing
 Please see the "LICENSE" file in the root of this repository for information related to licensing of this repository.
