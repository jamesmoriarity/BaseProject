import React from                   "react"
import Utils from                   "./SudokuSolverUtilities"
import CellManager from             "./CellManager"
import SolverState from             "./SolverState"
import SudokuRenderer from          "./Renderer/SudokuRenderer"
import CellShell from               "./Renderer/CellShell"
import PatternMap from              "./Renderer/PatternMap/PatternMap"
import PatternMapMaker from         "./Renderer/PatternMap/PatternMapMaker"
import PatternMapMakerFactory from  "./Renderer/PatternMap/PatternMapMakerFactory"
import SudokuBridgeService from     "../SudokuBridgeService/SudokuBridgeService"
import SBSValidationResult from     "../SudokuBridgeService/SBSValidationResult"
import SBSPuzzle from               "../SudokuBridgeService/SBSPuzzle"
import ServiceBridgeHint from       "../SudokuBridgeService/ServiceBridgeHint"

class SudokuSolver extends React.Component {
  state:SolverState
  cellManager:CellManager
  patternMap:PatternMap | undefined
  puzzleString:string
  greeting:string = "Aloha from Sudoku Solver : "
 	constructor(props:any){
 		super(props)
    this.state =  new SolverState()
    this.puzzleString = Utils.buildEmptyPuzzleString()
    this.cellManager = new CellManager(this.onCellClicked)
    window.addEventListener("keydown", this.onKeyPress);
 	}
  getCellPropertiesGrid = () => {
    return this.cellManager.buildCellPropertiesGrid(this.puzzleString)
  }
  // event handlers
  setMode  = (mode:string) => this.setState({inputMode:mode})
  onKeyPress = (keyboardEvent:KeyboardEvent) => {
    let val = Utils.translateKeyValue(keyboardEvent.key)
    if(Utils.isValidEntry(val)){
      this.clearPatternMap()
      this.cellManager.setSelectedCellValues(val, this.state.inputMode)
    }
  }
  clear = () => {
    this.clearPatternMap()
    this.resetPuzzle(Utils.buildEmptyPuzzleString())
  }
  undo = () => {
    this.clearPatternMap()
    this.cellManager.historyManager.undoLastEvent()
  }
  redo = () => {
    this.clearPatternMap()
    this.cellManager.historyManager.redoNextEvent()
  }
 	newPuzzle = () => this.getBridgeService().getNewPuzzle(this.onNewPuzzle)
 	reset = () => {
    this.clearPatternMap()
    this.resetPuzzle()
  }
  validate = () => {
    let s = this.toPuzzleString()
    this.getBridgeService().validate(s, this.onValidate)
  }
 	getHint = () => this.getBridgeService().getHint(this.toPuzzleString(), this.onHintReceived)
  onCellClicked = ( cellShell:CellShell, event:React.MouseEvent ) => {
    this.clearPatternMap()
		if(this.cellManager.selectedCells.includes(cellShell)){
      this.cellManager.unregisterSelectedCell(cellShell)
		}
		else{
      if(event.metaKey){  // if command key is held down
        this.cellManager.registerSelectedCell(cellShell)
      }
      else{
        this.cellManager.exclusiveRegisterSelectedCell(cellShell)
      }
    }
  }
  // callbacks
 	onNewPuzzle = (sbsPuzzle:SBSPuzzle) =>{
 		if(sbsPuzzle){
      this.resetPuzzle(sbsPuzzle.puzzleString)
    }
 		else{console.error("puzzle load failed. puzzle object is null")}
 	}
 	onValidate = (val:SBSValidationResult) => {
 		if(val)
      this.setState( { isValid:val.isValid, isComplete:val.isComplete,  validationErrors:[...val.invalidCells]} )
 	}
 	onHintReceived = (ssbHint:ServiceBridgeHint) => {
    if(ssbHint){
      this.clearPatternMap()
      this.patternMap = this.getPatternMap(ssbHint)
      this.cellManager.applyPatternMap(this.patternMap)
	 		console.log("ServiceBridgeHint: hint " + ssbHint.type + ": id="+ ssbHint.id)
    }
    else{
      console.log("onHintReceived: The hint object was null.")
    }
 	}
  // utilities
  getPatternMap = (hint:ServiceBridgeHint) => {
    let pmm:PatternMapMaker = PatternMapMakerFactory.getPatternMapMaker(hint as ServiceBridgeHint, this.cellManager)
		return pmm.makeMap()
	}
  resetPuzzle = (puzzleString:string | undefined = undefined) => {
    if(puzzleString){ this.puzzleString = puzzleString }
    this.clearPatternMap()
    this.cellManager.populatePuzzle(this.puzzleString)
  }
  clearPatternMap = () => {
    if(this.patternMap != undefined){
      this.cellManager.clearPatternMapCells(this.patternMap)
      this.patternMap = undefined
    }
  }
	render = () => { return new SudokuRenderer(this).render() }
  getBridgeService = () => { return new SudokuBridgeService()}
  toPuzzleString = () => { return this.cellManager.toPuzzleString() }
}
export default SudokuSolver
