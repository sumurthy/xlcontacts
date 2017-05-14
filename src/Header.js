import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'


import React, { Component } from 'react';

import MyContacts from './MyContacts'
import ExcelContacts from './ExcelContacts'
import Auth from './Auth'
import Home from './Home'

const ProtectedRoute = ({ component: Component, ...rest }) => { 

	let signinStatus = false

  	if (sessionStorage.getItem('signIn') === "TRUE") {
       	signinStatus = true
    }	

	return (
	  <Route {...rest} render={props => (

	    signinStatus ? (
	      <Component {...props}/>
	    ) : (
	      <Redirect to={{
	        pathname: '/auth',
	        state: { from: props.location }
	      }}/>
	    )
	  )}/>
	)
}

export class Header extends Component {

	constructor(props) {
	    super(props)
	}

	render() {
		const divStyle = {
			  padding: "35px",
			  margin: "20px"
		}

		let signinStatus = false;
	  	if (sessionStorage.getItem('signIn') === "TRUE") {
	       	signinStatus = true
	    }

		return (
			<Router> 
			<div>
				<nav className="navbar navbar-inverse bg-primary navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<h8 className="navbar-brand"><i>Excel Contacts Demo</i></h8>
						</div>
						<ul className="nav navbar-nav">
							<li className=""><Link to="/mycontacts">My Contacts</Link></li>
							<li><Link to="/excelcontacts">Export to Excel</Link></li>
							<li><Link to="/auth">{signinStatus ? `Logout`:`Login` } </Link></li>
						</ul>
					</div>
				</nav>
				<div  style={divStyle}>
					<Route path="/" exact component={Home}/>
					<ProtectedRoute  path="/mycontacts" component={MyContacts}/>
					<ProtectedRoute  path="/excelcontacts" component={ExcelContacts}/>
				    <Route path="/auth" render={(props) => (
                        <Auth {...props} stateChange={this.props.stateChange} />) }
                	/>
                	<Route path="/error"  render={(props) => (
                        <Error {...props}/>) }
                    />
				</div>
			</div>	
			</Router>
		);
	}
}


export default Header