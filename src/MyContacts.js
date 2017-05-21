import React, { Component } from 'react'
import Processing from './Processing'
import ErrorPage from './ErrorPage'
import hello from 'hellojs/dist/hello.all.js'
import Graph from './Graph'


export class MyContacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: "processing",
            contacts: [],
            msg: ''
            }
    }

    async componentDidMount() {

        let authResponse = hello('msft').getAuthResponse()
        try {
          let myContacts = await Graph.getContacts(authResponse.access_token)
          this.setState({status: "done", contacts: myContacts })
        } catch (e) {
          sessionStorage.setItem('signIn', "FALSE")
          this.setState({status: "error", msg: e})            
          this.props.appState()
        }
    }

    render() {
        switch (this.state.status) {
            case 'processing':
                return <Processing msg="Getting contacts."/>
            case 'done':
                return <ContactList contacts={this.state.contacts}/>
            case 'error': 
                return <ErrorPage msg={this.state.msg}/>
            default: 
                console.log('Error: Invalid case defined in the render method.')
                break
        }    
    }
}

function ContactList(props) {

    let rows = []
    props.contacts.forEach((e,i) => {
        rows.push(<tr key={i}><td>{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td><td>{e[3]}</td><td>{e[4]}</td><td>{e[5]}</td></tr>)
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


