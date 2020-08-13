export const inputText =text=>{
	//Return an action
	return {
		type: 'INPUT_TEXT',
		payload: text
	}
}
export const saveResults = result =>{
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

export const saveWords = words =>{

	return{
		type: "SAVE_WORDS",
		payload:words
	}
}
export const saveCSV = csvElements =>{
	return{
		type:"SAVE_CSV",
		payload:csvElements
	}
}
