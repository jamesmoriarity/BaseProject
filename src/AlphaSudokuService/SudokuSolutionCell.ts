import SudokuBox from "./SudokuBox"
import SudokuColumn from "./SudokuColumn"
import SudokuRow from "./SudokuRow"

class SudokuSolutionCell {
	index:Number
	value:String
	row!:SudokuRow
	column!:SudokuColumn
	box!:SudokuBox
	allClosedNumbers!:Set<String>
	openNumbers:Array<Number>
	constructor(index:Number, value:String){
		this.index = index
		this.value = value
		this.openNumbers = []
		this.allClosedNumbers = new Set()
	}

	setRow = (row:SudokuRow) => {
		this.row = row
	}

	setColumn = (column:SudokuColumn) => {
		this.column = column
	}

	setBox = (box:SudokuBox) => {
		this.box = box
	}

	loadClosedNumbers = () => {
		if(this.value == "0" && this.box && this.row && this.column){
			let boxNumbers = this.box.getClosedNumbers()
			let rowNumbers = this.row.getClosedNumbers()
			let columnNumbers = this.column.getClosedNumbers()
			this.allClosedNumbers = new Set( [...boxNumbers, ...rowNumbers, ...columnNumbers] )
		}
	}

	updateClosedNumbers = () => {
		if(this.value == "0"){
			let rowExtendedClosedNumbers = this.row.getExtendedClosedNumbers(this.index as number)
			for(let i = 0; i < rowExtendedClosedNumbers.length; i++){
				let rowClosedNumber:number = rowExtendedClosedNumbers[1]
				this.allClosedNumbers.add(String(rowClosedNumber))
			}
			// add these to allClosedNumbers, how to use Set object?
		}
	}

	updateOpenNumbers = () => {
		if(this.value == "0"){
			this.updateClosedNumbers()
			this.buildOpenNumbers()
		}
	}

	setOpenNumbers = () => {
		if(this.value == "0"){
			this.loadClosedNumbers()
			this.buildOpenNumbers()
		}
	}

	buildOpenNumbers = () => {
		this.openNumbers = []
		for(let i = 1; i < 10; i++){
			if(this.allClosedNumbers && !this.allClosedNumbers.has(String(i))){
				this.openNumbers.push(i)
			}
		}
	}

}
export default SudokuSolutionCell
