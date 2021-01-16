import SudokuSolutionCell from "./SudokuSolutionCell"

class SudokuBox{
	cellsInABoxRow:Number
	index:Number
	allCells:Array<SudokuSolutionCell>
	cells:Array<SudokuSolutionCell>
	constructor(index:Number, cells:Array<SudokuSolutionCell>){
		this.cellsInABoxRow = 3
		this.index = index
		this.allCells = cells
		this.cells = []
		this.setCells()
	}

	containsCell = (cellIndex:number) => {
		this.cells.forEach((cell:SudokuSolutionCell) => {
			if(cell.index == cellIndex){return true}
		})
		return false
	}

	getPencilPairs = () => {

	}

	setPencilPairs = () => {
		// look for pencil pairs, if they both appear in the same row or column, put them into a set
		// scan cells, look for two cells that are the only cells that can have a certain values
		// put them into some kind of map by values
		// for each cell in box get possible values
		//let valueMap = false
	}

	getPencilPairValuesPerRow = (rowIndex:number) => {
		if(rowIndex == 0){return []}
		return []
	}

	setCells = () =>{
		let indexPerCells:number = Number(this.index)/Number(this.cellsInABoxRow)
		let rowStartIndex:Number = Math.floor(indexPerCells) * Number(this.cellsInABoxRow)
		let columnStartIndex = (Number(this.index) % Number(this.cellsInABoxRow)) * Number(this.cellsInABoxRow);
		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				let fullIndex = (Number(rowStartIndex) * 9)  + (i * 9) + columnStartIndex + j
				let cell = this.allCells[fullIndex]
				cell.setBox(this)
				this.cells.push(cell)
			}
		}
	}

	getClosedNumbers = () =>{
		let nums = []
		let len = this.cells.length
		for(let i = 0; i < len; i++){
			let val = this.cells[i].value
			if (val != "0"){
				nums.push(val)
			}
		}
		return nums
	}
}
export default SudokuBox
