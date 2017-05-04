import React, { Component } from 'react';
import Main from './Main'
import Header from './Header'
import * as Hello from 'hellojs'

class App extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	        stateChange: false
	    }
   		this.updateState = this.updateState.bind(this)
	}

    componentDidMount() {

        Hello.init({
            msft: {
                oauth: {
                    version: 2,
                    auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
                },
                scope_delim: ' ',
                form: false
            }
        })      

        Hello.init({
            msft: '9b700ac9-4f07-4269-844f-afebf55c2dc2'
        }, {
            redirect_uri: 'http://localhost:3000/auth/'
        })
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
