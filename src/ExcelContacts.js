import React, { Component } from 'react';
import hello from 'hellojs/dist/hello.all.js'
import Graph from './Graph'
import Processing from './Processing'
import ErrorPage from './ErrorPage'

export class ExcelContacts extends Component {
	constructor (props) {
		super(props)
		this.state = {
			status: 'start',
      msg: '' 
		}
    this.exportToExcel = this.exportToExcel.bind(this)
	}

  async exportToExcel() {
    this.setState({status: 'processing', msg: ''})
    let authResponse = hello('msft').getAuthResponse()
    let contacts 
    try {
      contacts = await Graph.getContacts(authResponse.access_token)
      await Graph.ensureFileExists(authResponse.access_token)
      await Graph.loadContactInExcle(authResponse.access_token, contacts)
      this.setState({status: 'done', msg: ''})
    } catch (e) {
      this.setState({status: 'error', msg:'Error exporting to Excel file: ' + e})            
    }    
  }

	render() {
    switch (this.state.status) {
        case 'start':
          return (<div >
              <p className="lead"> Click below  to export the contacts data to an Excel file named <i> GraphExcelSample001.xlsx</i>.</p>
              <button className="btn btn-default" onClick={this.exportToExcel}>Export</button>
            </div>
          )
        case 'processing':
          return <Processing msg="Exporting contacts to Exce file."/>
        case 'done':
          return (
            <div >
              <p className="lead"> Done. Exported the contacts data to an Excel file named <i> GraphExcelSample001.xlsx</i>. Open the file from OneDrive to check out the updates.</p>
            </div>
          )
        case 'error': 
          return <ErrorPage msg={this.state.msg}/>
        default: 
          console.log('Error: Invalid case defined in the render method.')
          break
    }    
	}
}

export default ExcelContacts
