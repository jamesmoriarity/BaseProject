import SudokuSolutionCell from "./SudokuSolutionCell"

class SudokuColumn{
	index:Number
	allCells:Array<SudokuSolutionCell>
	cells:Array<SudokuSolutionCell>
	constructor(index:Number, cells:Array<SudokuSolutionCell>){
		this.index = index
		this.allCells = cells
		this.cells = []
		this.setCells()
		this.allCells = []
	}

	setCells = () =>{
		let offset = Number(this.index) % 9
		for(let i = 0; i < 9; i++){
			let cell = this.allCells[(i*9) + offset]
			cell.setColumn(this)
			this.cells.push(cell)
		}
	}

	getClosedNumbers = () =>{
		let nums = []
		for(let i = 0; i < this.cells.length; i++){
			let val = this.cells[i].value
			if (val != "0"){nums.push(val)}
		}
		return nums
	}
}

export default SudokuColumn
