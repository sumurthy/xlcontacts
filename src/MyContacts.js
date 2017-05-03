import React, { Component } from 'react';
import Processing from './Processing'

export class MyContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false,
            contacts: []
            }
    }

	async componentDidMount() {
	    console.log("Auth code used in the My contacts: " + localStorage.getItem('authCode'))
	    let response = await this.getContacts(localStorage.getItem('authCode'))

        if (response.ok) {
            let body = await response.json()
            let myContacts = this.processContacts(body)
            this.setState({done: true, contacts: myContacts })
            localStorage.setItem('contacts', JSON.stringify(myContacts))
        }
        else {
            console.log('Error--Error(1)')
        }
	}

	render() {
        if (!this.state.done) { 
            return <Processing msg="Getting contacts."/>
        } 
        else { 
            return <ContactList contacts={this.state.contacts}/>
        }
	}

    async getContacts(at="") {
    	console.log("AUTH CODE(1) " + at)
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', at)
        let response = null
        try {
            return await fetch('https://graph.microsoft.com/v1.0/me/contacts?$select=displayname,businessphones,businessaddress,emailaddresses', {
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


