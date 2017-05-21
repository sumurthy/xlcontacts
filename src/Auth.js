import React from 'react'
import hello from 'hellojs/dist/hello.all.js'
import {Config} from './config'
import Graph from './Graph'

//import ErrorPage from './ErrorPage'


class Auth extends React.Component {

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this)
      this.login = this.login.bind(this)
    }

    async logout(cb) {
      sessionStorage.setItem('signIn', "FALSE")
      this.props.stateChange()
      let authResponse = hello('msft').getAuthResponse()
      await Graph.closeSession(authResponse.access_token) 
      sessionStorage.setItem('workbookSessionId', '')          
      await hello('msft').logout(null, {force:true})   
      this.props.history.push('/')
    }

    login() {
      hello('msft').login({
        scope: Config.scopes,
        //display: 'page', // default is popup.
        response_type: 'token',  // 'code' for explicit
        force: true // (true) initiate auth flow and prompt for reauthentication where available. (null) initiate auth flow. (false) only prompt auth flow if the scopes have changed or the token expired.
      })
    }

  componentDidMount() {
    hello.on('auth.login', async (auth) => {
      if (auth.network === "msft") {
        let authResponse = hello('msft').getAuthResponse()
        try{
          let response = await Graph.getUserInfo(authResponse.access_token)
          if (response.ok) {
            let body =  await response.json()
            //sessionStorage.setItem('userEmail', body.mail)
            // refresh access token every 10 minutes
            //setInterval(refreshAccessToken, 1000 * 60 * 10 ); 
            await sessionStorage.setItem('signIn', "TRUE")
            await this.props.stateChange()
          }
          else {
            sessionStorage.setItem('signIn', "FALSE") 
            this.setState({status: "error", msg: response.status + ' : ' + response.statusText})            
            this.props.stateChange()            
          }
        } catch (e) {
          throw new Error('Login error')
        }
      }
      else {
      }
    })
  }

    render () {
      if (sessionStorage.getItem('signIn') === "TRUE") {
          return <div> <p className="lead"> You are currently logged-in. Select an option to continue. </p><p className="lead"> Click here to logout of your session:        
                    <br/> <button className="btn btn-default" onClick={this.logout}
                    >Logout </button></p> 
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


/*
    TODO: Provide background function to refresh token.
*/
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
//       nonce: 'xlcontacts',
//       login_hint: sessionStorage.getItem('userEmail'),
//       domain_hint: 'organizations'      
//     }

//     try{
//       await hello('msft').login(loginProperties)
//       console.log("Successfully refreshed access token. ")
//     }
//     catch (e) {        
//       console.error("Error refreshing access token ", e)
//     }
    
// }

export default Auth;
