import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class Results extends React.Component{
	state ={
		title:"",
		body:""
	}
	componentDidMount(){
		if(this.props.results===null){
			this.props.history.push('/')
		}else{
			console.log(this.props.results)
			this.setState({
				title:this.props.results.title,
				body:this.props.results.body,
			})
		}
	}
	render(){
		return(
			<div>
				<h1>{this.state.title}</h1>
				<p>{this.state.body}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return {results: state.results}
}


export default connect(mapStateToProps, null)(Results)