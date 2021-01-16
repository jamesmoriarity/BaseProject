import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"
import CellProperties from "../../CellProperties"
import PatternMapMaker from "./PatternMapMaker"
import CellShell from "../CellShell"
import CellManager from "../../CellManager"

class PatternMapMakerColumnHiddenSingle extends PatternMapMaker{
  constructor(hint:ServiceBridgeHint, cellManager:CellManager){
    super(hint, cellManager)
  }

  makeMap = () =>{
    this.setBackgroundAndMatchingCellsForColumn()
    return this.map
  }

  setBackgroundAndMatchingCellsForColumn = () =>{
    let column:Array<CellShell> = this.cellManager.getCellShellColumn(this.map.hint.columnIndex)
    let len:number = column.length
    for(let rowIndex:number = 0; rowIndex < len; rowIndex++){
      let cell:CellShell = column[rowIndex]
      this.map.hintBackgroundCells.push(cell.getProps().id)
      if(cell.getState().value == "0"){ // add row mates of empty cell of column
        this.setMatchingCellForRowOfEmptyColumnMate(rowIndex)
      }
    }
  }

  setMatchingCellForRowOfEmptyColumnMate = (rowIndex:number) => {
    let row = this.cellManager.getCellShellRow(rowIndex)
    let len:number = row.length
    let matchFound:Boolean = false
    for(let columnIndex:number = 0; columnIndex < len; columnIndex++){
      let cellValue = row[columnIndex].getState().value
      if(cellValue == this.map.hint.value){
        matchFound = true
        this.setMatchingCellAndBackground(rowIndex, columnIndex)
      }
    }
    if(!matchFound){
      this.setMatchingBoxCellForEliminatedCell(rowIndex, this.map.hint.columnIndex)
    }
  }

  setMatchingCellAndBackground = (rowIndex:number, columnIndex:number) => {
    this.map.hintMatchingCells.push(CellProperties.createId(rowIndex, columnIndex))
    this.setBackgroundsForColumnMatch(columnIndex, this.map.hint.columnIndex, rowIndex )
  }

  setBackgroundsForColumnMatch = (matchingCellColumnIndex:number, emptyCellColumnIndex:number, matchRowIndex:number ) =>{
      let leftIndex = emptyCellColumnIndex
      let rightIndex = matchingCellColumnIndex
      if(matchingCellColumnIndex < emptyCellColumnIndex){
        leftIndex = matchingCellColumnIndex;
        rightIndex = emptyCellColumnIndex
      }
      for(let i = leftIndex; i < rightIndex; i++ ){
        let id:string = CellProperties.createId(matchRowIndex, i)
        if(id != this.map.hint.id){
          this.map.hintBackgroundCells.push(id)
        }
      }
  }


}

export default PatternMapMakerColumnHiddenSingle
