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
