import React, { Component } from 'react';
import hello from 'hellojs/dist/hello.all.js'
import Graph from './Graph'

export class ExcelContacts extends Component {
	constructor (props) {
		super(props)
		this.state = {
			state: "start"
		}
	    this.export = this.export.bind(this)
	}

  async componentDidMount() {
   	
    let authResponse = hello('msft').getAuthResponse();
    let response = await Graph.getContacts(authResponse.access_token)

    if (response.ok) {
        let body = await response.json()
        let myContacts = Graph.processContacts(body)
        console.log(myContacts)
        
        this.setState({status: "done", contacts: myContacts })
        sessionStorage.setItem('contacts', JSON.stringify(myContacts))
    }
    else {
        sessionStorage.setItem('signIn', "FALSE");
        this.setState({status: "error", msg: response.status + ' : ' + response.statusText})            
        this.props.appState()
    }

  }

	async export() {
        let authResponse = hello('msft').getAuthResponse();
        let response = await this.getContacts(authResponse.access_token)
	}

	render() {
		return (
			<div >
				<p> Excel contacts</p>
			</div>
		);
	}
}

export default ExcelContacts
