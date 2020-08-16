import React from 'react'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import Papa from 'papaparse'
class MemCards extends React.Component{
	state={
		words:[["hey", "よ"], ["he","彼"],["she","彼女"]],
		currentIndex:0,
		flip:false,
		uploadedFiles:[],
		currentFile:0,
		fileUploaded:false,
		filenames: [],
		currentPair:[]
	}
	componentDidMount(){
		if(this.props.csvData.length!==0){
			this.setState({
			words:this.props.csvData,
			currentPair:this.props.csvData[0],
			currentIndex:0,
		})
		}
		document.addEventListener("keydown", this.handleKey, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKey, false);
	}
	handleClick=(e,name="",index=0)=>{
		if(name==="prev"){
			const index = this.state.currentIndex-1<0?this.state.words.length-1:this.state.currentIndex-1
			this.setState({
				currentPair: this.state.words[index],
				currentIndex:index,
				flip:false,
			})
		}else if(name==="next"){

			const index = this.state.currentIndex+1===this.state.words.length?0:this.state.currentIndex+1
			this.setState({
				currentPair: this.state.words[index],
				currentIndex:index,
				flip:false,
			})
		}else if(name==="flip"){
			this.setState({
				flip:!this.state.flip
			})
		}else if(name==="selectFile"){

			this.setState({
				words: this.state.uploadedFiles[index],
				currentFile:index,
				currentPair: this.state.uploadedFiles[index][0],
				flip:false,
				currentIndex:0
			})
		}
	}
	handleKey=e=>{
		if(e.keyCode===32){
			e.preventDefault()
			const index = this.state.currentIndex+1===this.state.words.length?0:this.state.currentIndex+1
			this.setState({
				currentPair: this.state.words[index],
				currentIndex:index,
				flip:false,
			})
		}
	}
	onFileChange = e =>{
		const{files} = e.target
		let valid=[]
		let filenames =[]
		for(let i=0;i<files.length;i++){
			Papa.parse(files[i], {
				complete: function(results) {
					valid.push(results.data)
			}
		})
			filenames.push([files[i].name, i])
		}
		this.setState({
			uploadedFiles: valid,
			currentFile:0,
			fileUploaded:true,
			filenames:filenames
		})

	}
	renderFiles = () =>{
		return(
			this.state.filenames.map((pair,id)=>{
				return <div 
				onClick={e=>this.handleClick(e,"selectFile",pair[1])} 
				className="fileName"
				style={this.state.currentFile===id? {'backgroundColor':'#e4fde1'}:{}}
				>
				{pair[0]}
				</div>
			})
		)
	}
	render(){
		return(
			<div className="memCardsUI" onKeyDown={(e)=>this.handleClick(e,"next")}>
				<div className="memCardsContainer">
					<div className="memBtn memCardsOuter" >
						<div 
						className={this.state.flip? "memCardsTextFront" : "memCardsTextBack"} 
						onClick={(e)=>this.handleClick(e,"flip")}
						>
							{
								this.state.flip? this.state.currentPair[1]: this.state.currentPair[0]
							}
						</div>
					</div>
					<div className="memBtn memCardsChange">
						<div className="memBtn memCardsPrev" onClick={(e)=>this.handleClick(e,"prev")}>prev</div>
						<div className="memBtn memCardsNext" onClick={(e)=>this.handleClick(e,"next")}>next</div>
					</div>
				</div>
				<div className="memCardsUpload">
					<div className="fileUpload">
						<Link to="/" className="homeLink" style={{fontSize:"2rem", "textAlign":"center"}}>Home</Link>
						<br/>
						<div style={{"height":"3rem"}}></div>
						<div className="csvCheck">既にcsvファイルをお持ちですか？</div><br/>
						<input 
						type="file" 
						onChange={this.onFileChange} 
						className="memCardsUploadBtn" 
						multiple 
						accept=".csv"
						/>
						<div className="filesContainer">
								{this.state.fileUploaded ? this.renderFiles() : null}
						</div>
					</div>
				</div>
			</div>
			
		)
	}

}
const mapStateToProps = state =>{
	return {
		csvData: state.csvElements
	}
}

export default connect(mapStateToProps, null)(MemCards)