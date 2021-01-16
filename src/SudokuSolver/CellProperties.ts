class CellProperties {
	static MODE_VALUE:string = 'mode_value'
	static MODE_PENCIL:string = 'mode_pencil'
	static MODE_CENTER:string = 'mode_center'
	rowIndex:number
	columnIndex:number
	id:string
	initialValue:string
	onCellClicked:Function
	registerCell:Function
	reportCellStateChange:Function
	constructor (rowIndex:number, columnIndex:number, initialValue:string, onCellClicked:Function, registerCell:Function, reportCellStateChange:Function){
		this.rowIndex = rowIndex
		this.columnIndex = columnIndex
		this.initialValue = initialValue
		this.onCellClicked = onCellClicked
		this.registerCell = registerCell
		this.reportCellStateChange = reportCellStateChange
		this.id = CellProperties.createId(rowIndex, columnIndex)
	}
	static createId = (rowIndex:number, columnIndex:number) => {
		return String(rowIndex) + "_" + String(columnIndex)
	}
	getIndex = () => {
		return (this.rowIndex * 9) + this.columnIndex
	}
}
export default CellProperties
