import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"
import CellManager from "../../CellManager"
import CellShell from "../CellShell"
import PatternMap from "./PatternMap"

class PatternMapMaker {
  map:PatternMap
  cellManager:CellManager

  constructor(hint:ServiceBridgeHint, cellManager:CellManager){
    this.map = PatternMap.getBlank()
    this.map.hint = hint
    this.cellManager = cellManager
  }

  makeMap = ():PatternMap => {
    return PatternMap.getBlank()
  }

  getColumnValueFromIndex = (index:number) => {
    return index % 9
  }

  getRowValueFromIndex = (index:number) =>{
    return Math.floor(index/9)
  }

  setMatchingBoxCellForEliminatedCell = (rowIndex:number, columnIndex:number) => {
    let boxStartColumnIndex = Math.floor(columnIndex/3)* 3
    let boxStartRowIndex = Math.floor(rowIndex/3) * 3
    for(let i = boxStartRowIndex; i < boxStartRowIndex + 3; i++){
      for(let j = boxStartColumnIndex; j < boxStartColumnIndex + 3; j++){
        let cellShell:CellShell = this.cellManager.getCellShellByIndexes(i, j)
        if(cellShell.getState().value == this.map.hint.value){
          this.map.hintMatchingCells.push(cellShell.getProps().id)
        }
      }
    }
  }

}

export default PatternMapMaker
