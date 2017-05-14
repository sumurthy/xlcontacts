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

## Contribution 

If you wish to see any feature or have questions, please open a Github issue on this repository. If you wish to contribute to add a new feature or fix an issue, please begin by opening an issue by stating the intended change. 



