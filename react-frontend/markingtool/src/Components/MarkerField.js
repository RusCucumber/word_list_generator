import React from 'react'
import "./App.css"
import {connect} from 'react-redux'
import {inputText, saveResults, setError} from '../actions'
import {withRouter} from 'react-router'
import {API_URL, API_HEADERS} from "../config"
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader"
class MarkerField extends React.Component{
	state ={
		loading: false,
		selected: [],
		sentence:"",
	}
	componentDidMount(){
		if(this.props.inputText ===""){
			this.props.history.push('/')
		}else{
			this.setState({
				sentence:this.props.inputText
			})
			console.log(this.props)
		}
	}
	selectWord =(word, index)=>{
		if(this.state.selected.includes(index)){
			this.setState({
				selected: this.state.selected.filter(num => num !== index)
			})
		}else{
			this.setState({
				selected: [...this.state.selected, index]
			})
		}
	}
	textRenderer = () =>{
		const textArray = this.state.sentence.split(" ")
		return(
			textArray.map((word,index)=>{
				return(
					<span 
						className="wordWrapper"
						key={index} 
						onClick={()=>this.selectWord(word,index)}
						style={this.state.selected.includes(index) ? {"background":"#028090", "color": "#E4FDE1"}:{"background": "none"}}
					>{word} </span>
				)
			})
		)
	}
	handleSubmit=e=>{

		this.setState({
			loading:true
		})

		const {sentence, index} = this.state

		axios.post(API_URL+"/sendtext", {sentence, index}, API_HEADERS)
		.then(r=>{
			console.log(r.data)
			this.setState({
				loading:false
			})
			this.props.saveResults(r.data)
		}, e=>{
			this.props.setError(e.response)
		})
		.then(()=>{
			this.props.history.push('/results')
		})
	}

	handleBack=()=>{
		this.props.history.push('/')
	}
	render(){
		console.log(this.state)
		return(
			this.state.loading? 
				<ScaleLoader 
					size={150}
	     	 		color={"#F45B69"}
	      			loading={this.state.loading}
	          	/> 
      		:
				<div className="ui markerField" >
					<div className="submitMarker">
						<div className="backBtnContainer"><span className="goBackBtn" onClick={this.handleBack}>🡄 BACK</span></div>
						<div className="submitBtnContainer"><span className="submitMarkerText" onClick={this.handleSubmit}>GO 🡆</span></div>
					</div>
					<div className="ui markerFieldText">
					{this.textRenderer()}
					</div>
				</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return {inputText: state.inputText}
}


export default connect(mapStateToProps, {saveResults, setError})(MarkerField)