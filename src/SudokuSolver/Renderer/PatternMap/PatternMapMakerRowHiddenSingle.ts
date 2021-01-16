import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"
import CellProperties from "../../CellProperties"
import PatternMapMaker from "./PatternMapMaker"
import CellShell from "../CellShell"
import CellManager from "../../CellManager"

class PatternMapRowHiddenSingle extends PatternMapMaker{
  constructor(hint:ServiceBridgeHint, cellManager:CellManager){
    super(hint, cellManager)
  }
  makeMap = () =>{
    this.setBackgroundAndMatchingCellsForRow()
    return this.map
  }
  setBackgroundAndMatchingCellsForRow = () =>{
    let row:CellShell[] = this.cellManager.getCellShellRow(this.map.hint.rowIndex)
    row.forEach((cell) => {
      this.map.hintBackgroundCells.push(cell.getProps().id)
      if(cell.getState().value == "0"){
        this.setMatchingCellForColumnOfEmptyRowMate(cell.getProps().columnIndex)
      }
    })
  }
  setMatchingCellForColumnOfEmptyRowMate = (columnIndex:number) => {
    let matchFound:Boolean = false
    let column = this.cellManager.getCellShellColumn(columnIndex)
    column.forEach((cell:CellShell) => {
      if(cell.getState().value == this.map.hint.value){
        matchFound = true
        this.map.hintMatchingCells.push(cell.getProps().id)
        this.setBackgroundsForColumnMatch(columnIndex, this.map.hint.rowIndex, cell.getProps().rowIndex )
      }
    })
    if(!matchFound){
      this.setMatchingBoxCellForEliminatedCell(this.map.hint.rowIndex, columnIndex)
    }
  }
  setBackgroundsForColumnMatch = (emptyCellColumnIndex:number, emptyCellRowIndex:number, matchRowIndex:number ) =>{
      let leftIndex = 0
      let rightIndex = 0
      if(emptyCellRowIndex < matchRowIndex){leftIndex = emptyCellRowIndex; rightIndex = matchRowIndex}
      else{leftIndex = matchRowIndex; rightIndex = emptyCellRowIndex}
      let len = rightIndex - leftIndex
      for(let i = leftIndex + 1; i < leftIndex + len; i++ ){
        this.map.hintBackgroundCells.push(CellProperties.createId(i, emptyCellColumnIndex))
      }
  }
}

export default PatternMapRowHiddenSingle
