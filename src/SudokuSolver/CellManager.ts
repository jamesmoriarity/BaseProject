import CellProperties from "./CellProperties"
import HistoryManager from "./HistoryManager"
import CellShell from "./Renderer/CellShell"
import PatternMap from "./Renderer/PatternMap/PatternMap"
import SudokuSolverUtilities from "./SudokuSolverUtilities"

class CellManager{
  cellShells:Map<string, CellShell>
  selectedCells: CellShell[]
  cellClickHandler:Function
  historyManager:HistoryManager
  constructor(cellClickHandler:Function){
    this.cellClickHandler = cellClickHandler
    this.historyManager = new HistoryManager()
    this.selectedCells = []
    this.cellShells = new Map()
  }
  //grid
  buildCellPropertiesGrid = (puzzleString:string) => {
    let puzzleArray:string[] = SudokuSolverUtilities.puzzleStringToArray(puzzleString)
    let grid = [[],[],[],[],[],[],[],[],[]] as CellProperties[][]
    puzzleArray.forEach((value, i) => {
      let rowIndex:number = Math.floor(i / 9)
      let columnIndex:number = i % 9
      let props:CellProperties = new CellProperties(rowIndex, columnIndex, value, this.cellClickHandler, this.registerCellShell, this.historyManager.reportCellStateChange)
      grid[rowIndex].push( props )
    })
    return grid
  }
  //  cellshells
  registerCellShell = (cellShell:CellShell) => { this.cellShells.set(cellShell.getProps().id, cellShell) }
  getAllValues = () => {
    let vals:string[] = []
    this.cellShells.forEach( (cellShell:CellShell) => { vals.push(cellShell.getState().value) } )
    return vals
  }
  getCellShell = (id:string) => {
    return this.cellShells.get(id) as CellShell
  }
  getCellShellByIndexes = (rowIndex:number, columnIndex:number) => {
    let id:string = CellProperties.createId(rowIndex, columnIndex)
    return this.getCellShell(id)
  }
  getCellShellColumn = (columnIndex:number) => {
    let column:CellShell[] = []
    for(let rowIndex:number = 0; rowIndex < 9; rowIndex++){
      let cell:CellShell | undefined = this.getCellShellByIndexes(rowIndex, columnIndex)
      if(cell){ column.push(cell) }
    }
    return column
  }
  getCellShellRow = (rowIndex:number) => {
    let row:CellShell[] = []
    for(let columnIndex:number = 0; columnIndex < 9; columnIndex++){
      let cell:CellShell | undefined = this.getCellShellByIndexes(rowIndex, columnIndex)
      if(cell){ row.push(cell) }
    }
    return row
  }
  // new
  populatePuzzle = (puzzleString:string) => {
    let values:string[] = puzzleString.split('')
    this.cellShells.forEach((cellShell:CellShell) => {
      cellShell.resetWithValue( values[ cellShell.getProps().getIndex() ] )
    })
    this.historyManager.clear()
  }
  toPuzzleString = () => { return this.getAllValues().join('') }
  // patternmap
  applyPatternMap = (patternMap:PatternMap) => {
    this.clearPatternMapCells(patternMap)
    patternMap.hintBackgroundCells.forEach(id => {
      this.getCellShell(id).setPatternMapState(PatternMap.PATTERN_STATE_BACKGROUND)
    })
    patternMap.hintMatchingCells.forEach(id => {
      this.getCellShell(id).setPatternMapState(PatternMap.PATTERN_STATE_SAME_VALUE)
    })
    let cell:CellShell = this.getCellShell(patternMap.hint.id)
    cell.setHintedValue(patternMap.hint.value)
  }
  clearPatternMapCells = (patternMap:PatternMap) => {
    patternMap.getAllCellIds().forEach((cellId:string) => {
      this.getCellShell(cellId).setPatternMapState(PatternMap.PATTERN_STATE_NONE)
    })
  }
  // selected cells
  exclusiveRegisterSelectedCell = (cell:CellShell) => {
    this.clearSelectedCells()
    this.registerSelectedCell(cell)
  }
  registerSelectedCell = (cell:CellShell) => {
    this.selectedCells.push(cell)
    cell.setSelected(true)
  }
  unregisterSelectedCell = (cell:CellShell) => {                    // called only by solver
    this.selectedCells.splice(this.selectedCells.indexOf(cell), 1)  // index already checked by solver
    cell.setSelected(false)
  }
  clearSelectedCells = () => {
    this.selectedCells.forEach((cell:CellShell) => { cell.setSelected(false) })
    this.selectedCells = []
  }
  setSelectedCellValues = (value:string, inputMode:string) => {
    this.selectedCells.forEach((cell:CellShell) => {
      switch(inputMode){
        case CellProperties.MODE_VALUE :{
          cell.setValue(value)
          break
        }
        case CellProperties.MODE_PENCIL :{
          cell.setPencilValue(value)
          break
        }
        case CellProperties.MODE_CENTER :{
          cell.setCenterValue(value)
          break
        }
      }
    })
  }
}
export default CellManager
