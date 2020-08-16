import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {inputText} from '../actions'
import "./App.css"
class TextField extends React.Component{
	state={
		inputText: "",
	}

	handleChange=e=>{
		const {value, name} = e.target
		this.props.inputText(value)
		this.props.history.push('/marker')
	}
	render(){
		return(
			<div className="textFieldContainer">
				<div className="description">
					<h1 style={{fontSize:"3rem"}}>翻訳単語帳ツール</h1>
					<br/>
					<div className="explanationContainer">

						<div className="explanationIcon">
							<div className="explanationText">
								<span style={{"background":"#028090", "color": "#E4FDE1"}}>this</span>
								<span>is </span>
								<span>a </span>
								<span>tool </span>
								<span>for </span>
								<span style={{"background":"#028090", "color": "#E4FDE1"}}>marking </span>
								<span>and </span>
								<span>translating </span>
								<span style={{"background":"#028090", "color": "#E4FDE1"}}>text </span>
								<span>to </span>
								<span>make </span>
								<span>cards </span>
							</div>
						</div>

						<div className="explanationArrow">⇨</div>

						<div className="resultIcon">
							<div className="resultIconBoxOne">これ</div>
							<div className="resultIconBoxTwo">this</div>
						</div>

					</div>
					<br/>
					<h1 className="explanationCopyPaste">まずはここに文章をコピペ</h1>
				</div>
				<form action="" className="ui inputField">
					<input 
						type="text"
						name="inputText"
						className="inputTextBox"
						onChange={this.handleChange}
						autoComplete="off"
					/>
				</form>
				<div className="homeCSV">
				<Link to="/memcards" className="homeLink" style={{fontSize:"1.5rem", "textAlign":"center", "fontWeight":"normal","color":"#588c80"}}>お持ちのcsvでスタート</Link>
				</div>
			</div>
		)
	}
}
const mapStateToProps =(state)=>{
	return {inputText: state.inputText}
}

export default connect(mapStateToProps, {inputText})(TextField)