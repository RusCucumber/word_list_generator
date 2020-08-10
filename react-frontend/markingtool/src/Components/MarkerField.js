import React from 'react'
import "./App.css"
import {connect} from 'react-redux'
import {inputText, saveResults} from '../actions'
import {withRouter} from 'react-router'
import {API_URL, API_HEADERS} from "../config"
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader"
class MarkerField extends React.Component{
	state ={
		loading: false,
		selected: [],
		inputText
	}
	componentDidMount(){
		if(this.props.inputText ===""){
			this.props.history.push('/')
		}else{
			this.setState({
				inputText:this.props.inputText
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
		const textArray = this.props.inputText.split(" ")
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
		console.log(this.state.selected)
		this.setState({
			loading:true
		})
		axios.post(API_URL, {
      title: 'foo',
      body: 'bar',
      userId: 1
    }, API_HEADERS)
		.then(r=>{
			console.log(r.data)
			this.setState({
				loading:false
			})
			this.props.saveResults(r.data)
		}, error=>{console.log(error)})
		.then(()=>{
			this.props.history.push('/results')
		})
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


export default connect(mapStateToProps, {saveResults})(MarkerField)