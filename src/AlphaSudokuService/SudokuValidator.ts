import SudokuValidatorResult from "./SudokuValidatorResult"

class SudokuValidator{
	puzzleString:String
	puzzleValues:String[]
	callback!:Function
	constructor(){
		this.puzzleValues = []
		this.puzzleString = ""
	}
	validate = (puzzleString:String, callback:Function) =>{
		this.puzzleString = puzzleString
		this.callback = callback
		this.puzzleValues = puzzleString.split("")
		this.getPuzzleSolution()
	}
	getPuzzleSolution = () => {
		fetch("./puzzle_expert.json")
     	.then(res => res.json())
     	.then(
     		(res) => {
				this.onSolutionReceived(res.puzzle.solution)
        		},
	        	(error) => {
	       	}
     	)
	}
	validateValues = (solutionString:String) => {
		let errors = []
		let isComplete = false
		let isValid = true
		let solutionValues = solutionString.split("")
		for(let i = 0; i < solutionValues.length; i++){
			let puzzleVal = this.puzzleValues[i]
			let solutionVal = solutionValues[i]
			if(puzzleVal != "0" && puzzleVal != solutionVal){
				errors.push(i)
				isValid = false
			}
		}
		if(isValid){
			let sv = String(solutionString)
			let ps = String(this.puzzleString)
			isComplete = (sv == ps)
		}
		this.onValidate (new SudokuValidatorResult(isValid, isComplete, errors))
	}
	onSolutionReceived = (solutionString:String) => {
		this.validateValues(solutionString)
	}
	onValidate = (validatorResult:SudokuValidatorResult) => {
		this.callback(validatorResult)
	}
}

export default SudokuValidator
