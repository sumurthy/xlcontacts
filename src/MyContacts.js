import React, { Component } from 'react';
import Processing from './Processing'
import ErrorPage from './ErrorPage'
import hello from 'hellojs/dist/hello.all.js'
import {Config} from './config'


export class MyContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "processing",
            contacts: [],
            msg: ''
            }
    }

	async componentDidMount() {

        let authResponse = hello('msft').getAuthResponse();
	    let response = await this.getContacts(authResponse.access_token)

        if (response.ok) {
            let body = await response.json()
            let myContacts = this.processContacts(body)
            this.setState({status: "done", contacts: myContacts })
            sessionStorage.setItem('contacts', JSON.stringify(myContacts))
        }
        else {
            sessionStorage.setItem('signIn', "FALSE");
            this.setState({status: "error", msg: response.status + ' : ' + response.statusText})            
            this.props.stateChange()
        }
	}

	render() {
        switch (this.state.status) {
            case 'processing':
                return <Processing msg="Getting contacts."/>
                break
            case 'done':
                return <ContactList contacts={this.state.contacts}/>
                break
            case 'error': 
                return <ErrorPage msg={this.state.msg}/>
                break;
        }    
	}

    async getContacts(token="") {
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', token)
        let response = null
        try {
            return await fetch(`${Config.graphUrl}/me/contacts?$select=displayname,businessphones,businessaddress,emailaddresses`, {
                headers: headers
            })
        } catch (e) {
            console.log("Error");
        } finally {
        }
    }

    processContacts(list={}) {
    	//let contacts = JSON.parse(list)
    	let contact =  []
    	let contacts = []
    	list.value.forEach((e) => {
    		contact.push(e.displayName)
    		contact.push(e.emailAddresses[0].address)
    		contact.push(e.businessPhones[0])
    		contact.push(e.businessAddress.city)
    		contact.push(e.businessAddress.state)
    		contacts.push(contact)
    		contact = []
    	})
    	return contacts
    }

}

function ContactList(props) {

	let rows = []
	 props.contacts.forEach((e,i) => {
	 	rows.push(<tr key={i}><td>{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td><td>{e[3]}</td><td>{e[4]}</td><td>{e[5]}</td></tr>);
    } ) 
   	return <div>
   				 <table className="table">
   			 	    <thead>
					      <tr>
					        <th>Name</th>
					        <th>Email</th>
					        <th>Phone</th>
					        <th>City</th>
					        <th>State</th>
					      </tr>
					</thead>
					<tbody>
					   {rows}
					</tbody>					      
   				 </table>
   		   </div>
}

export default MyContacts


