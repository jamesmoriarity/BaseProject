class SudokuSolverUtilities{
	constructor(){}
 	static buildEmptyPuzzleArray = () => {
 		let a = []
 		for(let i = 0; i < 81; i++){a.push("0")}
 		return a
 	}
	static buildEmptyPuzzleString = () => {
		return SudokuSolverUtilities.puzzleArrayToString(SudokuSolverUtilities.buildEmptyPuzzleArray())
	}
 	static puzzleArrayToString = (arr:Array<string>) => {
 		return arr.join('');
 	}
	static puzzleStringToArray = (s:string) => {
 		return String(s).split('')
 	}
	static getNumberMap = () => {
		let m:Map<string, boolean> = new Map()
		for(let i = 1; i < 10; i++){
			m.set(String(i), false)
		}
		return m
	}
	static getUsedNumbersFromMap = (map:Map<string, boolean>) => {
		let s:string = ""
		map.forEach((value,key)=>{ if(value){ s += key } })
		return s
	}
	static translateKeyValue = (val:string) => { return (val == "Backspace" || val == "Enter") ? "0" : val }
	static isValidEntry = (s:string) =>{
		let a:Array<string> = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]
		return a.includes(s)
	}
	static buildPuzzleGridFromArray = (arr:string[]) => {
		let grid = []
		for(let i = 0; i < 9; i++){
			let row = []
			for(let j = 0; j < 9; j++){
				let arrIndex = (i * 9) + j
				row.push(arr[arrIndex])
			}
			grid.push(row)
		}
		return grid
	}
	static isOnMarginOfBox = (index:number) => {
		return (index == 2 || index == 5)
	}
}
export default SudokuSolverUtilities
