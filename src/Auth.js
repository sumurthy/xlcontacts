import React from 'react'
//let hello = require('hellojs/dist/hello.all.js')
import hello from 'hellojs/dist/hello.all.js'
import ErrorPage from './ErrorPage'
import {Config} from './config'


class Auth extends React.Component {

  constructor(props) {
    super(props) 
    this.signOut = this.signOut.bind(this)
    this.login = this.login.bind(this)
  }

  signOut(cb) {
    sessionStorage.setItem('signIn', "FALSE") 
    this.props.stateChange()
    this.props.history.push('/')
  }

  login() {
      hello('msft').login({
        scope: Config.scopes,
        display: 'page', // default is popup.
        response_type: 'token',  // 'code' for explicit
        force: true // (true) initiate auth flow and prompt for reauthentication where available. (null) initiate auth flow. (false) only prompt auth flow if the scopes have changed or the token expired.
      })
  }

  async componentDidMount() {

    console.log("Auth component loaded")
    
    hello.on('auth.login', async (auth) => {
      console.log("Auth passed")

      if (auth.network === "msft") {
        let authResponse = hello('msft').getAuthResponse()
        let response = await this.getUserInfo(authResponse.access_token)

        if (response.ok) {
            let body =  await response.json()
            sessionStorage.setItem('userEmail', body.userEmail)
            //setInterval(refreshAccessToken, 1000 * 60 ); // refresh access token every 10 minutes
            sessionStorage.setItem('signIn', "TRUE")
            this.props.stateChange()
        }
        else {
            sessionStorage.setItem('signIn', "FALSE") 
            this.setState({status: "error", msg: response.status + ' : ' + response.statusText})            
            this.props.stateChange()            
        }
      }
      else {
      }
    })
  }

  render () {
    if (sessionStorage.getItem('signIn') === "TRUE") {
      return (
        <div> 
          <p className="lead"> You are logged in. Select an opion to continue or logout. </p>      
          <button className="btn btn-default" onClick={this.signOut}>Logout </button>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="control-group">
            <p className="lead"> Login to continue: </p>    
            <button className="btn btn-default" onClick={this.login}>Login</button>
          </div>
        </div>
      ) 
    }
  }

}

async function getUserInfo (token="") {
    console.log("Getting user information")
    let headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Authorization', token)
    let response = null
    try {
        return await fetch(`${Config.graphUrl}/me`, {
            headers: headers
        })
    } catch (e) {
        console.log("Error");
    } finally {
    }
}

// async function refreshAccessToken() {
//     if (!sessionStorage.getItem('signIn') === 'TRUE') {
//         console.log("Not refreshing access token")
//         return
//     }

//     let loginProperties = {
//       display: 'none',
//       response_type: "token",
//       response_mode: "fragment",
//       prompt: 'none',
//       scope: Config.scopes,
//       nonce: 'graph_explorer',
//       login_hint: 'organizations',
//       domain_hint: 'organizations'      
//     }

//     try{
//       await hello('msft').login(loginProperties)
//       console.log("Successfully refreshed access token.")
//     }
//     catch (e) {        
//       console.error("Error refreshing access token ", e)
//     }
    
// }

export default Auth 
