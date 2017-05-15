import React, { Component } from 'react';
import Header from './Header'
import hello from 'hellojs/dist/hello.all.js'
import {Config} from './config'


class App extends Component {

  constructor(props) {
      super(props)
      this.state = {
        stateChange: false
      }
      this.updateState = this.updateState.bind(this)
  }

    async componentDidMount() {
      hello.init({
        msft: {
          oauth: {
            version: 2,
            auth: Config.authUrl
          },
          scope_delim: ' ',
          form: false
        }
      })      

      hello.init({
        msft: Config.clientId
      }, {
        //redirect_uri: window.location.href
        redirect_uri: Config.redirectUrl
      })
    }

  updateState() {
    this.setState({stateChange: !this.state.stateChange})
  }

  render() {
    return (
      <div>
        <Header stateChange={this.updateState}/>
      </div>
    )
  }
} 

export default App;
