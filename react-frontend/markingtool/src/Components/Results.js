import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {saveCSV} from '../actions'
import ScaleLoader from "react-spinners/ScaleLoader"
import {API_URL, API_HEADERS} from "../config"

class Results extends React.Component{
	//CHANGE
	fakeResults = [
		["origin0", "translated"],
		["origin1", "translated"],
		["origin2", "translated"],
		["origin3", "translated"],
		["origin4", "translated"],
		["origin5", "translatdddded"],
		["origin6", "translated"],
		["origin7", "translated"],
		["origin8", "translated"],
		["origin9", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
		["origin0", "translated"],
	]
	state ={
		results:null,
		error:null,
		errorSet:false,
		dontShow: [],
		loading: false,
		invalid:false,
	}
	componentDidMount(){
		if(this.props.results===null && this.props.errors===null){
			this.props.history.push('/')
		}else if(this.props.errors===null){
			console.log("Words selected in frontend:", this.props.words)
			this.setState({
				//CHANGE
				// results: this.fakeResults.map((words,id)=>{
				// 	return [...words,id]
				// })
				results: this.props.results.word_list,	
			})
		}else{
			console.log(this.props.errors)
			this.setState({
				error:this.props.errors,
				errorSet:true
			})
		}
	}
	handleClick=(e,args={})=>{
		if(!this.state.dontShow.includes(args.id)){
			this.setState({
				dontShow: [...this.state.dontShow,args.id]
			})
		}else if(this.state.dontShow.includes(args.id)){
			this.setState({
				dontShow: this.state.dontShow.filter(id=>id!==args.id)
			})
		}
	}
	handleSubmit=()=>{
		const w = this.state.results.filter(word=>!this.state.dontShow.includes(word[2])||word[0].length===0||word[1].length===0)
		console.log("PRECSV",w)
		this.setState({
			loading:true
		})
		const csvElements= w.map(element=>{
			return [element[0],element[1]]
		})
		this.props.saveCSV(csvElements)
		this.setState({
			loading:false
		})
		this.props.history.push('/finaloptions')
	}
	handleChange=(outerIndex, innerIndex,e)=>{
		this.setState({
			fakeResults : this.state.results.map((pair, id)=>{
				if(id===outerIndex){
					pair[innerIndex] = e.target.value
					return pair
				}else{
					return pair
				}
			})
		})
	}
	renderError=()=>{
		//CHANGE
		return(
			<div>
				<h1>Error: {this.state.error.status}</h1>
				<p>{this.state.error.statusText}</p>
			</div>
		)
	}
	renderResults=()=>{
		return(
			this.state.results.map((pair,id)=>{
				return(
					<div 
					className="lemmaList" key={pair[2]} 
					style={this.state.dontShow.includes(pair[2])||pair[0].length===0||pair[1].length===0?{backgroundColor:"#f5f5f5"}:{display:"grid"}}
					>
						<div 
						className="wordResult"
						style={(this.state.dontShow.includes(pair[2])||pair[0].length===0||pair[1].length===0)?{textDecoration:"line-through"}:{textDecoration:"none"}}
						>
							<input 
							className="txtF originalText" 
							type="text"
							value={this.state.results[id][0]}
							onChange={(e)=>this.handleChange(id,0,e)}
							/> 
							<input 
							className="txtF translatedText" 
							type="text"
							value={this.state.results[id][1]}
							onChange={(e)=>this.handleChange(id,1,e)}
							/>
						</div>   
						<div
						className="lemmaBtn delete"
						name="delete" 
						onClick={(e)=>this.handleClick(e,{id:pair[2]})}
						style={this.state.dontShow.includes(pair[2])? {color:"black"}:{color:"#f56f5f"}}
						>
							{this.state.dontShow.includes(pair[2])? "UNDO":"DELETE"}
						</div>
					</div>
				)
			})
		)
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
				this.state.errorSet ? 
					this.renderError()
				:
					this.state.results?
						<div className="ui lemmaContainer">
							<div onClick={this.handleSubmit} className="finalSubmitBtnContainer"><span  className="finalSubmitBtn">GO 🡆</span></div>
							<div className="lemmaListWrapper">
								<div className="lemmaListWrap">
									{this.renderResults()}
								</div>
							</div>
						</div>
					:
						<div>..</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return {
		results: state.results,
		errors: state.errors,
		words: state.words
	}
}


export default connect(mapStateToProps, {saveCSV})(Results)