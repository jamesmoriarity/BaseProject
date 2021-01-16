import SudokuBox from "./SudokuBox"
import SudokuColumn from "./SudokuColumn"
import SudokuRow from "./SudokuRow"
import SudokuServiceHint from "./SudokuServiceHint"
import SudokuSolutionCell from "./SudokuSolutionCell"

class SudokuHintFinder{
	puzzleValues:Array<String>
	cells:Array<SudokuSolutionCell>
	boxes:Array<SudokuBox>
	rows:Array<SudokuRow>
	columns:Array<SudokuColumn>
	callback!:Function
	constructor(){
		this.puzzleValues = []
		this.cells = []
		this.boxes = []
		this.rows = []
		this.columns = []
	}
	findHint = (puzzleString:String, callback:Function) => {
		this.callback = callback
		this.puzzleValues = puzzleString.split("")
		this.initCells()
		this.initBoxesRowsColumns()
		this.cellsSetOpenNumbers()
		this.groupsSetExtendedClosedNumbers() // rows update to include pencil pairs [and hidden doubles] as closed
		this.cellsUpdateOpenNumbers()
		let algorithmList:Function[] = [this.findHiddenSingleInBoxes,this.findHiddenSingleInRows, this.findHiddenSingleInColumns, this.findNakedSingle]
		for(let i = 0; i < algorithmList.length; i++){
			let hint:SudokuServiceHint = algorithmList[i]()
			if(hint != null){this.callback(hint); return}
		}
		this.callback(null)
		return

	}

	cellsUpdateOpenNumbers = () => {
		// each cell calls its rows and column to update open numbers by
		// including pencil pairs in their row/column's included boxes
		for(let i = 0; i < this.cells.length; i++ ){
			let cell:SudokuSolutionCell = this.cells[i]
			cell.updateOpenNumbers()
		}
	}

	groupsSetExtendedClosedNumbers = () => {
		// each row and column checks with its included boxes for pencil pairs, [and hidden doubles]
		for(let row of this.rows){
			row.setPencilPairs()
		}
		for(let box of this.boxes){
			box.setPencilPairs()
		}
	}

	initCells = () => {
		for(let i in this.puzzleValues){
			this.cells.push(new SudokuSolutionCell(Number(i), this.puzzleValues[Number(i)]))
		}
	}
	initBoxesRowsColumns = () => {
		for(let i = 0; i < 9; i++){
			this.boxes.push(new SudokuBox(i, this.cells))
			this.rows.push(new SudokuRow(i, this.cells))
			this.columns.push(new SudokuColumn(i, this.cells))
		}
	}
	cellsSetOpenNumbers = () => {
		let len = this.cells.length
		for(let i = 0; i < len; i++){
			let cell = this.cells[i]
			cell.setOpenNumbers()
		}
	}
	findHiddenSingleInBoxes = () => {
		return this.findHiddenSingleInGroupings(this.boxes, "Box")
	}
	findHiddenSingleInRows = () => {
		return this.findHiddenSingleInGroupings(this.rows, "Row")
	}
	findHiddenSingleInColumns = () => {
		return this.findHiddenSingleInGroupings(this.columns, "Column")
	}
	findNakedSingle = () => {
		let len = this.cells.length
		for(let i = 0; i < len; i++){
			let cell:SudokuSolutionCell = this.cells[i]
			if(cell.value == "0" && cell.openNumbers.length == 1){
		    		return (new SudokuServiceHint(cell.index, String(cell.openNumbers[0]), "Naked Single"))
		    	}
		}
		return null
	}
	findHiddenSingleInGroupings = (groupings:Array<any>, type:String) => {
		let len = groupings.length
		for(let i = 0; i < len; i++){
			let group = groupings[i]
			let hiddenSingleHint = this.getHiddenSingle(group.cells, type)
			if(hiddenSingleHint != null){
				return hiddenSingleHint
			}
		}
		return null
	}
	getHiddenSingle = (cells:Array<SudokuSolutionCell>, type:String) =>{
		let len = cells.length
	//	let a:Array<any> = [ ["1",[]], ["2",[]], ["3",[]], ["4",[]], ["5",[]], ["6",[]], ["7",[]], ["8",[]], ["9",[]] ]
		let vals = new Map()
		vals.set("1", [])
		vals.set("2", [])
		vals.set("3", [])
		vals.set("4", [])
		vals.set("5", [])
		vals.set("6", [])
		vals.set("7", [])
		vals.set("8", [])
		vals.set("9", [])

		// make a map of values with an array of cells that have that value as an open value
		for(let i = 0; i < len; i++){
			let cell = cells[i]
			let openNumbers = cell.openNumbers
			if(openNumbers.length > 0){
				let leng = openNumbers.length
				for(let j = 0; j < leng; j++){
					let key:String = String(openNumbers[j])
					let currVals:Array<number> = vals.get(key)
					currVals.push(i)
					vals.set(key, currVals)
				}
			}
		}
		// loop through each key in vals, check to see if only one cell's index
		// is in the array, length == 1, if so return it as a hidden single
		for (let key of vals.keys()) {
		  let cellIndexes = vals.get(key)
		  if(cellIndexes.length == 1){
		  	let index = cellIndexes[0]
		  	let cell = cells[index]
		  	return new SudokuServiceHint(cell.index, key, "Hidden Single:" + type)
		  }
		}


		return null
	}
}

export default SudokuHintFinder
