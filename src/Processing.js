import React, { Component } from 'react';

export class Processing extends Component {
	render() {
		return (
			<div><p className="lead"> Processing...{this.props.msg}</p>	</div>			
		);
	}
}

export default Processing