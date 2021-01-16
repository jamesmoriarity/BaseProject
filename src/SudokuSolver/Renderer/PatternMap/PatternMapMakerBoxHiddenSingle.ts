import PatternMapMaker from "./PatternMapMaker"
import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"
import PatternMap from "./PatternMap"
import CellProperties from "../../CellProperties"
import CellShell from "../CellShell"
import CellManager from "../../CellManager"

class PatternMapMakerBoxHiddenSingle extends PatternMapMaker{
  constructor(hint:ServiceBridgeHint, cellManager:CellManager){
    super(hint, cellManager)
  }
  makeMap = (): PatternMap =>{
    this.setBoxCellsForHint()
    this.setMatchingValuesForBoxRows()
    this.setMatchingValuesForBoxColumns()
    return this.map
  }

  setMatchingValuesForBoxColumns = () => {
    let columnStart:number = Math.floor(this.map.hint.columnIndex/3) * 3
    let rowStart:number = Math.floor(this.map.hint.rowIndex/3) * 3
    for(let columnIndex = columnStart; columnIndex < columnStart + 3; columnIndex++){
      if (this.blankCellExistsInColumnOfBox(rowStart, columnIndex)){
        this.setMatchingValuesForColumn(columnIndex)
      }
    }
  }
  blankCellExistsInColumnOfBox = (rowStart:number, columnIndex:number) => {
    for(let rowIndex:number = rowStart; rowIndex < rowStart + 3; rowIndex++){
      if(this.cellManager.getCellShellByIndexes(rowIndex, columnIndex).getState().value == "0"){
        return true
      }
    }
    return false
  }
  blankCellExistsInRowOfBox = (rowIndex:number, columnStart:number) => {
    for(let columnIndex:number = columnStart; columnIndex < columnStart + 3; columnIndex++){
      if(this.cellManager.getCellShellByIndexes(rowIndex, columnIndex).getState().value == "0"){
        return true
      }
    }
    return false
  }
  setMatchingValuesForColumn = (columnIndex:number) => {
    let column:CellShell[] = this.cellManager.getCellShellColumn(columnIndex)
    column.forEach((cell:CellShell) => {
      if(cell.getState().value == this.map.hint.value){
        let props:CellProperties = cell.getProps()
        this.map.hintMatchingCells.push(props.id)
        this.setBackgroundsForColumn(props.columnIndex, props.rowIndex)
      }
    })
  }
  setBackgroundsForColumn = (columnIndex:number, matchRowIndex:number) => {
    let hintIndex = this.map.hint.rowIndex
    let leftIndex = matchRowIndex
    let rightIndex = hintIndex
    if(hintIndex < matchRowIndex){leftIndex = hintIndex; rightIndex = matchRowIndex}
    for(let i = leftIndex + 1; i < rightIndex; i++ ){
      this.map.hintBackgroundCells.push(CellProperties.createId(i, columnIndex))
    }
  }
  // box row
  setMatchingValuesForBoxRows = () => {
    let rowStart:number = Math.floor(this.map.hint.rowIndex/3) * 3
    let colStart:number = Math.floor(this.map.hint.columnIndex/3) * 3
    for(let i = rowStart; i < rowStart + 3; i++){
      if(this.blankCellExistsInRowOfBox(i, colStart)){
        this.setMatchingValuesForRow(i)
      }
    }
  }
  setMatchingValuesForRow = (rowIndex:number) => {
    let row:CellShell[] = this.cellManager.getCellShellRow(rowIndex)
    row.forEach((cell:CellShell) => {
      if(cell.getState().value == this.map.hint.value){
        let props:CellProperties = cell.getProps()
        this.map.hintMatchingCells.push(props.id)
        this.setBackgroundsForRow(props.rowIndex, props.columnIndex)
      }
    })
  }
  setBackgroundsForRow = (rowIndex:number, matchIndex:number) => {
    let hintIndex = this.map.hint.columnIndex
    let leftIndex = matchIndex
    let rightIndex = hintIndex
    if(hintIndex < matchIndex){leftIndex = hintIndex; rightIndex = matchIndex}
    for(let i = leftIndex + 1; i < rightIndex; i++ ){
      this.map.hintBackgroundCells.push(CellProperties.createId(rowIndex, i))
    }
  }
  // box
  setBoxCellsForHint = () => {
    let boxStartColumnIndex = Math.floor(this.map.hint.columnIndex/3)* 3
    let boxStartRowIndex = Math.floor(this.map.hint.rowIndex/3) * 3
    for(let i = boxStartRowIndex; i < boxStartRowIndex + 3; i++){
      for(let j = boxStartColumnIndex; j < boxStartColumnIndex + 3; j++){
        let id:string = CellProperties.createId(i,j)
        if(id != this.map.hint.id)
          this.map.hintBackgroundCells.push(id)
      }
    }
  }
}
export default PatternMapMakerBoxHiddenSingle
