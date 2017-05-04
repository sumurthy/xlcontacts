import React, { Component } from 'react';
import Header from './Header'

class App extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	        stateChange: false
	    }
   		this.updateState = this.updateState.bind(this)
	}



	updateState() {
	    this.setState({stateChange: !this.state.stateChange})
	}

	render() {
		return (
			<div>
				<Header stateChange={this.updateState}/>
			</div>
		)
	}
} 

export default App;
