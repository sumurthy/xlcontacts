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
		let authCode = sessionStorage.getItem('authCode')
		let contacts = sessionStorage.getItem('contacts')
        let params = this.checkFileExists(authCode)
        let response = await this.checkFileExists(params['access_token'])

        if (response.ok) {
            let body = await response.json()
            sessionStorage.setItem('authCode', params['access_token']);
            sessionStorage.setItem('signIn', "TRUE");
            this.props.stateChange()
            console.log('Saved Auth Code: ' + sessionStorage.getItem('authCode'))
            this.setState({done: true})
        }
        else {
            sessionStorage.setItem('signIn', "FALSE");
            sessionStorage.setItem('authCode', "");
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
