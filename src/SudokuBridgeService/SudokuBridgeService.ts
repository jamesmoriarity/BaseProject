import SudokuService from "../AlphaSudokuService/SudokuService"
import SudokuValidatorResult from "../AlphaSudokuService/SudokuValidatorResult"
import SudokuServiceResponse from "../AlphaSudokuService/SudokuServiceResponse"
import ServiceBridgeHint from "../SudokuBridgeService/ServiceBridgeHint"
import SBSValidationResult from "./SBSValidationResult"
import SBSPuzzle from "./SBSPuzzle"

class SudokuBridgeService {
	service:SudokuService
	clientCallback!:Function
	constructor(){
		this.service = new SudokuService()
	}

	getHint = (puzzleString:String, callback:Function) => {
		this.clientCallback = callback
		this.service.getHint(puzzleString, this.onHintReceived)
	}

	onHintReceived = (sudokuServiceResponse:SudokuServiceResponse) => {
		if(!sudokuServiceResponse || !sudokuServiceResponse.isValid){this.clientCallback(null)}
		else{
			let ssbHint:ServiceBridgeHint = ServiceBridgeHint.fromSudokuServiceHint(sudokuServiceResponse.getHint())
			this.clientCallback(ssbHint)
		}
	}

	validate = (puzzleString:String, callback:Function) => {
		this.clientCallback = callback
		this.service.validate(puzzleString, this.onValidate)
	}

	onValidate = (validationResponse:SudokuValidatorResult) =>{
		let isValid = validationResponse.isValid
		let invalidCells = validationResponse.errors
		let isComplete = validationResponse.isComplete
		let validationResult:SBSValidationResult = new SBSValidationResult(isValid, invalidCells, isComplete)
		this.clientCallback(validationResult)
	}

	getNewPuzzle = (callback:Function) => {
		this.clientCallback = callback
		this.service.getNewPuzzle(this.onNewPuzzle)
	}

	onNewPuzzle = (serviceResponse:SudokuServiceResponse) => {
		let puzzle:SBSPuzzle = new SBSPuzzle("id", serviceResponse.puzzle.start as string)
		this.clientCallback(puzzle)
	}
}

export default SudokuBridgeService
