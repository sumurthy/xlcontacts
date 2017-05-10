import React from 'react'
import hello from 'hellojs/dist/hello.all.js'
import {Config} from './config'
//import ErrorPage from './ErrorPage'


class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this)
        this.login = this.login.bind(this)
    }

    async signOut(cb) {
        sessionStorage.setItem('signIn', "FALSE")
        this.props.stateChange()
        await hello('msft').logout(null, {force:true})        
        console.log('Logged out')
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

  async componentDidMount() {

    console.log("Auth component loaded")

    hello.on('auth.login', async (auth) => {
      console.log("Auth passed")
      if (auth.network === "msft") {
        let authResponse = hello('msft').getAuthResponse()
        let response = await getUserInfo(authResponse.access_token)

        if (response.ok) {
            let body =  await response.json()
            sessionStorage.setItem('userEmail', body.mail)
            console.log(sessionStorage.getItem('userEmail'))
            //setInterval(refreshAccessToken, 1000 * 60 * 1 ); // refresh access token every 10 minutes
            await sessionStorage.setItem('signIn', "TRUE")
            await this.props.stateChange()
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

async function getUserInfo (token="") {
    console.log("Getting user information: " + token)
    let headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Authorization', token)
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
