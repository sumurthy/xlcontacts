import React, { Component } from 'react';
export class ErrorPage extends Component {
	render() {
		return (
			<div> 
				<p className="lead bg-danger"> Error in processing your request. Try signinig in again. {this.props.msg} </p>		
			</div>
		);
	}
}

export default ErrorPage
