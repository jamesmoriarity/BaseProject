import SudokuServiceHint from "./SudokuServiceHint"
import SudokuServiceResponse from "./SudokuServiceResponse"
import SBSValidationResult from "../SudokuBridgeService/SBSValidationResult"
import SudokuValidator from "./SudokuValidator"
import SudokuHintFinder from "./SudokuHintFinder"
class SudokuService{
	puzzleArray:Array<Number>
	callback:Function
  isValid: any

	constructor(){
		this.puzzleArray = []
		this.callback = this.doNothing
	}

	doNothing = () => {
		return true
	}

	// ----- hint
	getHint = (puzzleString:String, callback:Function) => {
		this.callback = callback
		let shf:SudokuHintFinder = new SudokuHintFinder()
		shf.findHint(puzzleString, this.onHintReceived)
	}
	onHintReceived = (hint:SudokuServiceHint) => {
		if(hint != null){
			let ssr = new SudokuServiceResponse(true)
			ssr.setHint(hint)
			this.callback(ssr)
		}
		else{
			this.callback(null)
		}
	}
	// ----- validate
	validate = (puzzleString:String, callback:Function) => {
		this.callback = callback
		let validator = new SudokuValidator()
		validator.validate(puzzleString, this.onValidate)
	}
	onValidate = (result:SBSValidationResult) => {
			this.callback(result)
	}
	getFailedValidationServiceResponse = (errors:Array<Number>) => {
		let ssr = new SudokuServiceResponse(false)
		ssr.setErrors(errors)
		return ssr
	}

	// ---- new puzzle
	getNewPuzzle = (callback:Function) => {
		fetch("./puzzle.json")
     	.then(res => res.json())
     	.then(
     		(res) => {
				callback(this.getSuccessfulNewPuzzleServiceResponse(res))
        		},
	        	(error) => {
				callback(this.getFailedNewPuzzleServiceResponse(error))
	       	}
     	)
	}
	getSuccessfulNewPuzzleServiceResponse = (puzzleResult:any) => {
		let ssr = new SudokuServiceResponse(true)
		ssr.setPuzzle(puzzleResult.puzzle)
		return ssr
	}
	getFailedNewPuzzleServiceResponse = (error:any) => {
		let ssr = new SudokuServiceResponse(false)
		ssr.addError(error)
		return ssr
	}
}
export default SudokuService
