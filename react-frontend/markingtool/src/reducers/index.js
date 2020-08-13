import { combineReducers } from 'redux' 

const textReducer = (inputText="", action) =>{
	switch(action.type){
		case "INPUT_TEXT":
			return action.payload
		default:
			return inputText
	}
}
const wordsReducer=(inputWords=[], action)=>{
	switch(action.type){
		case 'SAVE_WORDS':
			return action.payload
		default:
			return inputWords
	}
}

const resultsReducer =(results=null, action)=>{
	switch(action.type){
		case 'SAVE_RESULTS':
			return action.payload
		default:
			return results
	}
}

const errorsReducer =(errors=null, action)=>{
	switch(action.type){
		case 'SET_ERROR':
			return action.payload
		default:
			return errors
	}
}

const csvReducer = (csvElements=[], action)=>{
	switch(action.type){
		case 'SAVE_CSV':
			return action.payload
		default:
			return csvElements
	}
}
//creates Store states? 
//For example, state.songs = [list of song objects]
export default combineReducers({
	inputText: textReducer,
	results: resultsReducer,
	errors: errorsReducer,
	words: wordsReducer,
	csvElements: csvReducer
})