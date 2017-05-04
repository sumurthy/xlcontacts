import React, { Component } from 'react';
import Hello from 'hellojs'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


export class Secure extends Component {

	constructor(props) {
	    super(props)
	    console.log(JSON.stringify(props))
	    this.signIn = this.signIn.bind(this)
	    this.signOut = this.signOut.bind(this)

	}


	signIn() {
	    //window.location.replace('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9b700ac9-4f07-4269-844f-afebf55c2dc2&response_type=token&redirect_uri=http://localhost:3000/auth/&scope=contacts.readwrite+files.readwrite+offline_access&response_mode=fragment&state=12345&nonce=678910')
	}

	signOut(cb) {
		//this.props.signOut()
        localStorage.setItem('signIn', "FALSE");
        this.props.stateChange()
		this.props.history.push('/')
	}

	render() {
		if (localStorage.getItem('signIn') === "TRUE") {
			return <div> <p className="lead"> Logout of your session: </p>		
						<button className="btn btn-default" onClick={Hello('windows').login()}
						>Logout </button>
					</div>
		}
		else {
			return <div><div className="control-group">
							<p className="lead"> Login to continue: </p>	
					        <button className="btn btn-default" onClick={this.signIn}>Login</button>
					     </div>
					</div> 
		}

	}
}


export default Secure

