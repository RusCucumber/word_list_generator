import React from 'react'
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
		filenames: []
	}
	componentDidMount(){
		if(this.state.csvData){
			this.setState({
			words:this.props.csvData
		})
		}
		
	}
	handleClick=(e,name="",index=0)=>{
		if(name==="prev"){
			const index = this.state.currentIndex-1<0?this.state.words.length-1:this.state.currentIndex-1
			this.setState({
				currentIndex: index,
				flip:false,
			})
		}else if(name==="next"){
			const index = this.state.currentIndex+1===this.state.words.length?0:this.state.currentIndex+1
			this.setState({
				currentIndex:index,
				flip:false,
			})
		}else if(name==="flip"){
			this.setState({
				flip:!this.state.flip
			})
		}else if(name==="selectFile"){
			this.setState({
				currentFile: index
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
			this.state.filenames.map(pair=>{
				return <div onClick={e=>this.handleClick(e,"selectFile",pair[1])}>{pair[0]}</div>
			})
		)
	}
	render(){

		return(
			<div className="memCardsUI">
				<div className="memCardsContainer">
					<div className="memBtn memCardsOuter">
						<div 
						className={this.state.flip? "memCardsTextFront" : "memCardsTextBack"} 
						onClick={(e)=>this.handleClick(e,"flip")}
						>
							{
								this.state.flip? this.state.words[this.state.currentIndex][1]: this.state.words[this.state.currentIndex][0]
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
						既にcsvファイルをお持ちですか？<br/>
						<input 
						type="file" 
						onChange={this.onFileChange} 
						className="memCardsUploadBtn" 
						multiple 
						accept=".csv"
						/>
						{this.state.fileUploaded ? this.renderFiles() : null}
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