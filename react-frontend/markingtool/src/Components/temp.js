import React from 'react'
import TextField from "./TextField"
import MarkerField from "./MarkerField"
import "./App.css"

class App extends React.Component{
	state = {
		inputText:"",
		selected:[],
		loading: false,
		textReady:false
	}

	componentDidUpdate(){
		console.log(this.state)
	}

	handleChange=e=>{
		const {value, name} = e.target
		this.setState({[name]: value, textReady:true})
	}
	getSelection=e=>{
		console.log(window.getSelection().toString())
		this.setState({
			loading: !this.state.loading
		})
	}
	selectWord=(word,index)=>{
		console.log(word)
		this.setState({
			selected: [...this.state.selected, index]
		})
	}

	textRenderer = () =>{
		const textArray = this.state.inputText.split(" ")
		return(
			textArray.map((word,index)=>{
				return(
					<span 
						className="wordWrapper"
						key={index} 
						onClick={()=>this.selectWord(word,index)}
						style={this.state.selected.includes(index) ? {"background":"yellow"}:{"background": "none"}}
					>{word} </span>
				)
			})
		)
	}

	render(){
		return(
			<div>
				<div className="appContainer">

					<div className="cards">
						
						{this.state.textReady ? 
						<MarkerField
							textRenderer={this.textRenderer}
						/>
						:
						<TextField 
							handleChange={this.handleChange}
							inputText={this.state.inputText}
						/>
					}
					</div>
				</div>
			</div>
			
		)
	}
}

export default App