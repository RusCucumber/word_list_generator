import React from 'react'
import {connect} from 'react-redux'
import {inputText} from '../actions'
import {withRouter} from 'react-router'
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
					<h1>稲葉の白兎</h1>
					<h1>翻訳したい単語を文章の中から選択し送信すると、このツールが単語帳にしてくれるよ！</h1>
					<h1>まずはこのに文章をコピペして</h1>
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
			</div>
		)
	}
}
const mapStateToProps =(state)=>{
	return {inputText: state.inputText}
}

export default connect(mapStateToProps, {inputText})(TextField)