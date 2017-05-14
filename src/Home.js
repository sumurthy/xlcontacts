import React, { Component } from 'react';

export class Home extends Component {
	render() {
		return (
			<div><p className="lead"><br/> This is a <b>demo</b> application that demonstrates the usage of <a href='https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/excel'> Excel REST API </a> via Microsoft Graph API. This application exports your personal contacts to an Excel worksheet. <br/> </p> 
			<p className="lead"> Pre-requisites: OneDrive Business account and contacts. In order for the demo to funciton correctly, ensure you have some contacts in your profile.  </p>
			<br/><code>The source code is located at  <a href='https://github.com/sumurthy/xlcontacts'>https://github.com/sumurthy/xlcontacts</a>. Refer to Readme page for more details.</code> </div>
		);
	}
}

export default Home
