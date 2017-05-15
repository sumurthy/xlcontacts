# Excel REST API: ReactJs Sample application. 

This is a **demo** application that demonstrates the usage of [Excel REST API]('https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/excel)  via Microsoft Graph API. This application exports your personal contacts to an Excel worksheet. <br/> 

## Pre-requisites

* OneDrive Business account and contacts. 
* In order for the demo to funciton correctly, ensure you have some contacts in your profile.  
* Developer registration via: https://apps.dev.microsoft.com/. 
* Configure web application with `Contacts.ReadWrite`, `Files.ReadWrite`, `User.read` scopes. Use `http://localhost:3000/auth` as the redirect URL. 

## Steps 

Clone or download this repository. Change to the `xlexports` directory. Execute command `npm install`. Substitute your client ID in `src/config.json` file. 

Run `npm start` command from the base folder. 

## Highlights 

### Authorization 
The application uses [implicit auth flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-implicit) for completing the authorization flow. [`hello.js`](https://adodson.com/hello.js/) client-side JavaScript SDK is used for authenticating with OAuth2.  

`hello.js` initialization is called in `App` component's `componentDidMount` method. The authorization flow is hanlded in `Auth` component. `hello.on` method registers the function that is invoked when the login is complete. Anytime an auth token is required to make a service call, `getAuthResponse()` method can be called to retrieve the `access_token`. 

This version of the application doesn't incorporate background refreshing of the auth token. 

### Microsoft Graph API 

All of the Microsoft Graph API calls are grouped in `Graph.js` helper functions. The application provides two simple functionality. One is to display few properties of user's personal contacts in the page. Second, it exports all of the contacts to an Excel file under user's OneDrive for business under the root folder in a file named `GraphExcelSample001.xlsx`. 

Specifically, for Excel export's functionality, the application does the following: 

1. Checks if the file mentioned above already exists, if not it creates an empty Excel file using empty Excel file's base-64 representation.  
2. It creates a new worksheet and then a new table on the newly created worksheet. It then adds new rows by providing the contact's array as an input. 

## Contribution 

If you wish to see any feature or have questions, please open a Github issue on this repository. If you wish to contribute to add a new feature or fix an issue, please begin by opening an issue by stating the intended change. 




