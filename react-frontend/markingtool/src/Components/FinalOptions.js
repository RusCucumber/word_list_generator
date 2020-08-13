import React from 'react'
import {connect} from 'react-redux'
import {API_URL, API_HEADERS} from "../config"
import {CSVLink, CSVDownload} from "react-csv"
import {Link} from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader"
import axios from 'axios'
const debug = false


class FinalOptions extends React.Component{
	state = {
		username:"",
		password:"",
		csvData: [],
		loading: false,
		quizletURL:""
	}
	componentDidMount(){
		
		this.setState({
			csvData: this.props.csvElements
		})
		
	}
	createCSV=()=>{
		const csvRows = []
	}
	handleChange=e=>{
		e.preventDefault()
		const {name, value} = e.target
		console.log(this.state)
		this.setState({
			[name]:value
		})
	}
	handleSubmit =e=>{
		e.preventDefault()
		const {password, username, csvData} = this.state
		console.log("POSTING TO /quizlet",{username, password, words:csvData})
		this.setState({loading:true})
		if(!debug){
			axios.post(API_URL+"/quizlet", {username, password, words:csvData}, API_HEADERS)
			.then(r=>{
				console.log(r.data)
				this.setState({
					loading:false,
					quizletURL:r.data.url
				})
			},e=>{console.log(e)})
		}else{
			setTimeout(()=>this.setState({
				loading:false,
				quizletURL:"https://www.hhhhhhahahahahahaha.com"
			}), 30000)
			
		}
	}
	renderForm =()=>{
		return(
			
				<form action="submit" onSubmit={this.handleSubmit}>
					{
						this.state.loading?
							<div className="quizletLoad">
								<ScaleLoader 
								size={200}
				     	 		color={"#F45B69"}
				      			loading={this.state.loading}
				      			/>
				      		</div>
	          			:
			          		<div className="quizletFormContainer">
				          		<div>
									<label className="quizletFormText" for="username">Username:</label>
									<input className="quizletFormTextBox" type="text" value={this.state.username} name="username" onChange={this.handleChange} autoComplete="off"/>
								</div>
							
								<div>
									<label className="quizletFormText" for="pass">Password:</label>
									<input className="quizletFormTextBox" type="password" required value={this.state.password} name="password" onChange={this.handleChange} autoComplete="off"/>
								</div>
							
								<input className="quizletFormSubmit" type="submit" value="Sign in"/>
							</div>
					}
				</form>
		)
	}
	renderURL=()=>{
		return(
			this.state.loading?
				<div className="quizletLoad">
					<ScaleLoader 
					size={200}
	     	 		color={"#F45B69"}
	      			loading={this.state.loading}
	      			/>
      			</div>
			:
			<div className="quizletURLContainer">
				<a href={this.state.quizletURL} target="_blank" className="quizletURL">quizletCards</a>
			</div>
		)
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
						<div className="csvDownload">Download</div>

					</CSVLink>
					<div className="quizletContainer">
						<div className="quizletLogo">
							<div className="boxOne"/>
							<div className="boxTwo">+</div>
							<div className="quizletText">Quizlet</div>
						</div>
						{
							this.state.quizletURL!==""? 
								this.renderURL() 
							:
								this.renderForm()
						}
					</div>
					<Link to="/" className="homeLink">Home</Link>
				</div>
			:
				<div>
					<Link to="/" className="homeLink">Home</Link>
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