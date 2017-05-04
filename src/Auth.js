import React from 'react'
let hello = require('hellojs/dist/hello.all.js')
//import * as Hello from 'hellojs'


import ErrorPage from './ErrorPage'

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            done: false
            }
        this.signOut = this.signOut.bind(this)
        this.login = this.login.bind(this)
    }

    signOut(cb) {
        localStorage.setItem('signIn', "FALSE");
        this.props.stateChange()
        this.props.history.push('/')
    }

    login() {
        
        hello('msft').login({
            scope: 'contacts.readwrite,files.readwrite,offline_access'
        })
    }

    async componentDidMount() {

        hello.init({
            msft: {
                oauth: {
                    version: 2,
                    auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
                },
                scope_delim: ' ',
                form: false
            }
        })      

        hello.init({
            msft: '9b700ac9-4f07-4269-844f-afebf55c2dc2'
        }, {
            redirect_uri: window.location.href
        })

        hello.on('auth.login', (auth) => {
            let accessToken;
            if (auth.network === "msft") {
                let authResponse = hello('msft').getAuthResponse();
                accessToken = authResponse.access_token;
                localStorage.setItem('authCode', accessToken);
                localStorage.setItem('signIn', "TRUE");
                this.props.stateChange()
                //this.setState({done: true})
            }
            else {
                localStorage.setItem('signIn', "FALSE");
                localStorage.setItem('authCode', "");
            }
        })
    }

    render () {
        if (localStorage.getItem('signIn') === "TRUE") {
            return <div> <p className="lead"> Logout of your session: </p>      
                        <button className="btn btn-default" onClick={this.signOut}
                        >Logout </button>
                    </div>
        }
        else {
            return <div><div className="control-group">
                            <p className="lead"> Login to continue: </p>    
                            <button className="btn btn-default" onClick={this.login}>Login</button>
                         </div>
                    </div> 
        }
    }

}


export default Auth;
