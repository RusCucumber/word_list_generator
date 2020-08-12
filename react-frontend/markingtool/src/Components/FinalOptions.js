import React from 'react'
import {connect} from 'react-redux'
import {API_URL, API_HEADERS} from "../config"
import {CSVLink, CSVDownload} from "react-csv"
import ScaleLoader from "react-spinners/ScaleLoader"
import axios from 'axios'



class FinalOptions extends React.Component{
	state = {
		csvData: []
	}
	componentDidMount(){
		this.setState({
			csvData: this.props.csvElements
		})
	}
	createCSV=()=>{
		const csvRows = []
	}
	render(){
		return(
			this.state.csvData.length>0?
				<div className="ui finalOptionsContainer">
					<CSVLink data={this.state.csvData} className="csvContainer">
						<div className="csvicon">
							<p className="csvicontextcontainer">
								<span className="csvicontext">CSV</span>
							</p>
						</div>
					</CSVLink>
					<div className="quizletContainer">
						QUIZLET
					</div>
				</div>
			:
				<div>
					
				</div>
		)
	}
}


const mapStateToProps=state=>{
	return {
		csvElements:state.csvElements
	}
}

export default connect(mapStateToProps,null)(FinalOptions)