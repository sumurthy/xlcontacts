import React, { Component } from 'react';

export class ExcelContacts extends Component {

	constructor (props) {
		super(props)
		this.state = {
			state: "start"
		}
	    this.export = this.export.bind(this)

	}


	async export() {

		let authCode = localStorage.getItem('authCode')
		let contacts = localStorage.getItem('contacts')
        let params = this.checkFileExists(authCode)
        let response = await this.checkFileExists(params['access_token'])

        if (response.ok) {
            let body = await response.json()
            localStorage.setItem('authCode', params['access_token']);
            localStorage.setItem('signIn', "TRUE");
            this.props.stateChange()
            console.log('Saved Auth Code: ' + localStorage.getItem('authCode'))
            this.setState({done: true})
        }
        else {
            localStorage.setItem('signIn', "FALSE");
            localStorage.setItem('authCode', "");
        }
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
