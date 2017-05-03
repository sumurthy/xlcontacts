import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import Processing from './Processing'
import MyContacts from './MyContacts'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            done: false
            }
    }


    async componentDidMount() {
        localStorage.setItem('signIn', "FALSE");
        localStorage.setItem('authCode', "");
        let params = this._extractParams(this.props.location.hash)
        if (params['access_token']) {
            let response = await this._getDrive(params['access_token'])
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
    }

    render () {
        if (!this.state.done) { 
            return <Processing msg="Getting authorization token."/>
        } 
        else { 
            return <MyContacts/>
        }
    }


/* 
    This method parses out the auth code if one exists. \
*/

    _extractParams = (segment = '') => {
        let parts = segment.split('#');
        if (parts.length <= 0) return {};
        segment = parts[1]
        let params = {}
        let regex = /([^&=]+)=([^&]*)/g
        let matches = ''

        while ((matches = regex.exec(segment)) !== null) {
            params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2])
        }

        return params
    }

    async _getDrive(at="") {
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', at)
        let response = null
        try {
            return await fetch('https://graph.microsoft.com/v1.0/me/drive', {
                headers: headers
            })
        } catch (e) {
            console.log("Error----------------------------------------------------");
        } finally {
        }
    }
}


export default Auth;
