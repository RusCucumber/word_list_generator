import { combineReducers } from 'redux' 

const textReducer = (inputText="", action) =>{
	switch(action.type){
		case "INPUT_TEXT":
			return action.payload
		default:
			return inputText
	}
}


const resultsReducer =(results =null, action)=>{
	switch(action.type){
		case 'SAVE_RESULTS':
			return action.payload
		default:
			return results
	}
}

const errorsReducer =(errors =null, action)=>{
	switch(action.type){
		case 'SET_ERROR':
			return action.payload
		default:
			return errors
	}
}

//creates Store states? 
//For example, state.songs = [list of song objects]
export default combineReducers({
	inputText: textReducer,
	results: resultsReducer,
	errors: errorsReducer
})