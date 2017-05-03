import React, { Component } from 'react';

export class ExcelContacts extends Component {

	constructor (props) {
		super(props)
		this.state = {
			state: "start"
		}
	    this.export = this.export.bind(this)

	}


	export() {

		

	}


	render() {
		return (
			<div >
				<form>
				  <div className="form-group">
				    <label for="sheetname">Sheet name</label>
				    <input placeholder="(optional)" type="sheetname" className="form-control" id="sheetname"/>
				  </div>
				  <button type="submit" className="btn btn-default">Go</button>
				</form>
			</div>
		);
	}
}

export default ExcelContacts
