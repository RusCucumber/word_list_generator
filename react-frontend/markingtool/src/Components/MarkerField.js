import React from 'react'
import "./App.css"
import {connect} from 'react-redux'
import {saveResults, setError, saveWords} from '../actions'
import {API_URL, API_HEADERS} from "../config"
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader"

class MarkerField extends React.Component{
	state ={
		loading: false,
		index: [],
		sentence:"",
	}
	componentDidMount(){
		if(this.props.inputText ===""){
			this.props.history.push('/')
		}else{
			this.setState({
				sentence:this.props.inputText
			})
		}
	}
	selectWord =(word, id)=>{
		if(this.state.index.includes(id)){
			this.setState({
				index: this.state.index.filter(num => num !== id)
			})
		}else{
			this.setState({
				index: [...this.state.index, id]
			})
		}
	}
	textRenderer = () =>{
		const textArray = this.state.sentence.split(" ")
		return(
			textArray.map((word,id)=>{
				return(
					<span 
						className="wordWrapper"
						key={id} 
						onClick={()=>this.selectWord(word,id)}
						style={this.state.index.includes(id) ? {"background":"#028090", "color": "#E4FDE1"}:{"background": "none"}}
					>{word} </span>
				)
			})
		)
	}
	handleSubmit=e=>{
		if(this.state.index.length>0){
			const words = this.state.sentence.split(" ").filter((word, id)=>this.state.index.includes(id))
			this.setState({
				loading:true
			})
			this.props.saveWords(words)
			const {sentence, index} = this.state
			index.sort((a,b) => a-b)
			// console.log("SENDING DATA: ", {sentence, index, selectedWords:words})
			axios.post(API_URL+"/lemmatisation", {sentence, index, selectedWords:words}, API_HEADERS)
			.then(r=>{
				// console.log("Post request response", r.data)
				this.setState({
					loading:false
				})
				this.props.saveResults(r.data)
				}, e=>{
				// console.log("Error")
				this.props.setError(e.response)
				}
			)
			.then(()=>{
				this.props.history.push('/results')
			})
		}
	}

	handleBack=()=>{
		this.props.history.push('/')
	}
	render(){
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
					
					<div className="markerFieldText">
						{this.textRenderer()}
					</div>
				
				</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return {inputText: state.inputText}
}


export default connect(mapStateToProps, {saveResults, setError, saveWords})(MarkerField)