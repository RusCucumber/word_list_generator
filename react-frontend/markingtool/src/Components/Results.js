import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class Results extends React.Component{
	state ={
		title:"",
		body:"",
		error:null,
		errorSet:false,
	}
	componentDidMount(){
		if(this.props.results===null && this.props.errors===null){

			this.props.history.push('/')
		}else if(this.props.errors===null){
			console.log("Results in Resultsjs",this.props.results)
			this.setState({
				title:this.props.results.title,
				body:this.props.results.body,
			})
		}else{
			console.log(this.props.errors)
			this.setState({
				error:this.props.errors,
				errorSet:true
			})
		}
	}
	renderError=()=>{
		return(
			<div>
				<h1>Error: {this.state.error.status}</h1>
				<p>{this.state.error.statusText}</p>
			</div>
		)
	}
	render(){
		return(
			this.state.errorSet ? 
				this.renderError()
			:
				<div>
					<h1>{this.state.title}</h1>
					<p>{this.state.body}</p>
				</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return {
		results: state.results,
		errors: state.errors
	}
}


export default connect(mapStateToProps, null)(Results)