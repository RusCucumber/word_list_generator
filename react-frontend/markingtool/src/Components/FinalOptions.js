import React from 'react'
import {connect} from 'react-redux'
import {API_URL, API_HEADERS} from "../config"
import {CSVLink, CSVDownload} from "react-csv"
import {Link} from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader"
import axios from 'axios'


class FinalOptions extends React.Component{
	state = {
		username:"",
		password:"",
		csvData: [],
		loading: false,
		quizletURL:"",
		requestingQuizlet: false,
		id:"",
		scheduleID:"",
		quizletError:false
	}
	componentDidMount(){
		this.setState({
			csvData: this.props.csvElements
		})
		
	}
	handleChange=e=>{
		e.preventDefault()
		const {name, value} = e.target
		this.setState({
			[name]:value
		})
	}
	handleSubmit =e=>{
		e.preventDefault()
		const {password, username, csvData} = this.state
		console.log("POSTING TO /quizlet",{username, password, words:csvData})
		this.setState({loading:true})

		axios.post(API_URL+"/quizlet", {username, password, words:csvData}, API_HEADERS)
		.then(r=>{
			console.log("First POST response (Initializes async task and gets ID)",r.data)
			if(r.data.result==="OK"){
				this.setState({
					requestingQuizlet:true,
					id: r.data.id,
					scheduleID: setInterval(this.requestScheduler, 2000)
				})
			}else if(r.data.result==="NG"){
				this.setState({
					loading:false,
					quizletError:true,
				})
			}
		},e=>{
			clearInterval(this.state.scheduleID)
			this.setState({
				loading: false,
				requestingQuizlet:false,
				id:"",
				scheduleID:"",
				quizletError:true,
			})
			})
		}

	requestScheduler = () =>{
		//バックで非同期処理の状態を確認する
		console.log("Running schedule, waiting for URL")
		const id = this.state.id
		axios.post(API_URL + "/quizletprogress",{id},API_HEADERS)
		.then(r=>{
			console.log(r.data)
			if(r.data.result==="OK"){
				if(r.data.url===""){
					this.setState({
						loading: false,
						requestingQuizlet:false,
						quizletError:true,
					})
				}else if(r.data.url!==""){
					this.setState({
						loading:false,
						requestingQuizlet:false,
						quizletURL:r.data.url
					})
				}
				clearInterval(this.state.scheduleID)
			}else if(r.data.result==="NG"){
				console.log("処理中")
			}
		},e=>{
			clearInterval(this.state.scheduleID)
			this.setState({
				loading: false,
				requestingQuizlet:false,
				id:"",
				scheduleID:"",
				quizletError:true,
			})
		})
	}
	handleClick =()=>{
		this.props.history.push('/memcards')
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
				      			<div className="processing">処理中です。30秒ほどかかります。</div>
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
								{this.state.quizletError ? <div className="processingError">もう一度実行してみてください。</div> : null}
							</div>
					}
				</form>
		)
	}
	renderURL=()=>{
		return(
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

					<div className="memCards" onClick={this.handleClick}>
						<div className="memCardLogo">
							<div className="memBoxOne"/>
							<div className="memBoxTwo">この場で</div>
						</div>
					</div>

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