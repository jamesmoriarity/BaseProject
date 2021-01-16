import SudokuBox from "./SudokuBox"
import SudokuSolutionCell from "./SudokuSolutionCell"

class SudokuRow{
	index:number
	allCells:Array<SudokuSolutionCell>
	cells:Array<SudokuSolutionCell>
	boxes:Array<SudokuBox>
	constructor(index:number, allCells:Array<SudokuSolutionCell>){
		this.index = index
		this.allCells = allCells
		this.cells = []
		this.boxes = []
		this.setCells()
		this.setBoxes()
	}

	getBoxIndexes = () => {
		let boxStartRow:number = Math.floor(this.index/3)
		let boxStartIndex:number = boxStartRow * 3
		let boxIndexes:Array<number> = [boxStartIndex, boxStartIndex + 1, boxStartIndex + 2]
		return boxIndexes
	}

	setBoxes = () => {
		let boxIndexes = this.getBoxIndexes()
		for(let i in boxIndexes){
			this.boxes.push(new SudokuBox(Number(i), this.allCells))
		}
	}

	setPencilPairs = () => {

	}

	getBoxesNotContainingCell = (cellIndex:number) => {
		let boxes:Array<SudokuBox> = []
		for(let i = 0; i < this.boxes.length; i++){
			let box:SudokuBox = this.boxes[i]
			if(!box.containsCell(cellIndex)){
				boxes.push(box)
			}
		}
		return boxes
	}

	getPencilPairValuesFromBoxesExcludingCell = (cellIndex:number) => {
		let boxes:Array<SudokuBox> = this.getBoxesNotContainingCell(cellIndex)
		let pencilPairValues:Array<number> = []
		for(var i = 0; i < boxes.length; i++){
			let box:SudokuBox = boxes[i]
			let boxPencilPairValues:Array<number> = box.getPencilPairValuesPerRow(this.index)
			if(boxPencilPairValues.length > 0){
				pencilPairValues = [...pencilPairValues, ...boxPencilPairValues]
			}
		}
		return pencilPairValues
	}

	getExtendedClosedNumbers = (cellIndex:number) => {
		return [...this.getPencilPairValuesFromBoxesExcludingCell(cellIndex)]
	}

	setCells = () => {
		let start = this.index * 9
		for(let i = 0; i < 9; i++){
			let cell = this.allCells[start+i]
			cell.setRow(this)
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

export default SudokuRow
