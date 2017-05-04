import React, { Component } from 'react';
export class ErrorPage extends Component {
	render() {
		return (
			<div> 
				<p className="lead bg-danger"> Error in Login step. Try again. </p>		
			</div>
		);
	}
}

export default ErrorPage
