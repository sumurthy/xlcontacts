import React, { Component } from 'react';
import Secure from './Secure'
export class ErrorPage extends Component {
	render() {
		return (
			<div> 
				<p className="lead bg-danger"> Error in Login step. Try again. </p>		
				<Secure/>
			</div>
		);
	}
}

export default ErrorPage
