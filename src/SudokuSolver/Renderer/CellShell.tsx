import React from "react"
import CellProperties from "../CellProperties"
import Utils from "../SudokuSolverUtilities"
import CellShellState from "./CellShellState"
import PatternMap from "./PatternMap/PatternMap"

class CellShell extends React.PureComponent {
	constructor(props:CellProperties){
		super(props)
		this.state = new CellShellState(props.initialValue)
	}
	// event handlers
	onClick = (event:React.MouseEvent) => {	this.getProps().onCellClicked(this, event) }
	// public setters
	setSelected = (b:boolean) => {
		this.setState( { selected:b } )
	}
	setHintedValue = (val:string) => {
		let newState = {...this.getState()}
		newState.value = val
		newState.patternMapState = PatternMap.PATTERN_STATE_HINTED
		this.setStateInHistory(newState) // omitting this from history
	}
	setPatternMapState = (pmState:String) => {
		this.setState( { patternMapState:pmState } )
	}
	setValue = (val:string) => {
		if(this.getState().value != val && Utils.isValidEntry(val)){
			let newState:CellShellState = {...this.getState()}
			newState.value = val
			this.setStateInHistory(newState)
		}
	}
	setPencilValue = (val:string) => {
		if(val != "0"){
			let newState:CellShellState = {...this.getState()}
			let key = val
			let map:Map<string, boolean> = new Map(this.getState().pencilValues)
			if(map.has(key)){ map.delete(key)}
			else{ map.set(key, true) }
			newState.pencilValues = map
			this.setStateInHistory(newState)
		}
	}
	setCenterValue = (val:string) => {
		if(val != "0"){
			let newState:CellShellState = {...this.getState()}
			let key = val
			let map:Map<string, boolean> = new Map(this.getState().centerValues)
			if(map.has(key)){ map.delete(key)}
			else{ map.set(key, true) }
			newState.centerValues = map
			this.setStateInHistory(newState)
		}
	}
	setStateInHistory = (newState:CellShellState) =>{
		this.getProps().reportCellStateChange(this, {...this.getState()}, {...newState})
		this.setState(newState)
	}
	updateState = (newState:CellShellState) => { this.setState( newState ) }
	resetWithValue = (val:string) => {
		if(val != this.getState().value || this.getState().centerValues.size != 0 || this.getState().pencilValues.size != 0){
			this.setState(new CellShellState(val))
		}
	}
	// lifecycle
	render = () => {
		return 	<div className={this.getClasses()} onClick={this.onClick}>
							<div className="valueDiv">{this.getDisplayValue()}</div>
							<div className="marks">
								<div className="pencilDiv">{this.getPencilValues()}</div>
								<div className="centerDiv">{this.getCenterValues()}</div>
							</div>
						</div>
	}
	componentDidMount = () => {
		this.getProps().registerCell(this)
	}
	// internal getters for state and props
	getState = () => { return this.state as CellShellState }
	getProps = () => { return this.props as CellProperties }
	// internal setters
	//display helpers
	getDisplayValue = () => {
		return (this.getState().value == "0") ? "" : this.getState().value
	}
	getPencilValues = () => {
		return Utils.getUsedNumbersFromMap(this.getState().pencilValues)
	}
	getCenterValues = () => {
		return Utils.getUsedNumbersFromMap(this.getState().centerValues)
	}
	getClasses = () => {
		let classes = ["cell_shell"]
		if(Utils.isOnMarginOfBox(this.getProps().columnIndex))
			classes.push("column-right")
		if(Utils.isOnMarginOfBox(this.getProps().rowIndex))
			classes.push("row-bottom")
		if(this.getState().selected)
			classes.push("selected")
		if(this.getState().value != "0")
			classes.push("hasValue")
		if(this.getState().patternMapState != PatternMap.PATTERN_STATE_NONE){
			classes.push("patternmap_" + this.getState().patternMapState)
		}
		return  classes.join(" ")
	}
	// end
}

export default CellShell
