export const inputText =text=>{
	//Return an action
	console.log(text)
	return {
		type: 'INPUT_TEXT',
		payload: text
	}
}
export const saveResults = result =>{
	console.log("Saving results to store...")
	return{
		type: 'SAVE_RESULTS',
		payload:result
	}
}

export const setError = error =>{
	console.log(error)
	return{
		type: 'SET_ERROR',
		payload:error,
	}
}
