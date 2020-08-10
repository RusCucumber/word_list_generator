import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import TextField from './TextField'
import MarkerField from './MarkerField'
import Results from './Results'
import  "./App.css"

const App =()=>{
	return(
		<div>
			<HashRouter>
				<div className="appContainer">
					<Route path="/" exact component={TextField}/>
					<Route path="/marker" exact component={MarkerField}/>
					<Route path="/results" exact component={Results}/>
				</div>
			</HashRouter>
		</div>
	)
}


export default App