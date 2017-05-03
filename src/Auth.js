import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import MyContacts from './MyContacts'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isSignedIn: false}
        console.log('PROPS: ' + JSON.stringify(props))
    }


    async componentDidMount() {
        let params = this._extractParams(this.props.location.hash)
        if (params['access_token']) {
            let response = await this._getDrive(params['access_token'])
            if (response.ok) {
                let body = await response.json()
                localStorage.setItem('authCode', "Bearer " + params['access_token']);
                localStorage.setItem('signIn', "TRUE");
                console.log('Auth Code: ' + localStorage.getItem('authCode'))
            }
            else {
                localStorage.setItem('signIn', "FALSE");
                localStorage.setItem('authCode', "");
            }
        }
    }

    render () {
        return <Redirect to='/mycontacts'/>
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
            console.log("Error");
        } finally {
        }
    }
}

export default Auth;
