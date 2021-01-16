import SudokuServiceHint from "../AlphaSudokuService/SudokuServiceHint"
import CellProperties from "../SudokuSolver/CellProperties"

class ServiceBridgeHint{
  value:string
  id:string
  type:string
  columnIndex:number
  rowIndex:number
  static typeHiddenSingleBox:string = "Hidden Single:Box"
  static typeHiddenSingleRow:string = "Hidden Single:Row"
  static typeColumnHiddenSingle:string = "Hidden Single:Column"
  static typeNakedSingle:string = "Naked Single"

  constructor(){
    this.columnIndex = 0
    this.rowIndex = 0
    this.value = ""
    this.type = ""
    this.id = ""
  }
  static fromSudokuServiceHint(h:SudokuServiceHint){
    let ssbHint = new ServiceBridgeHint()
    ssbHint.value = h.value as string
    ssbHint.columnIndex = h.index as number % 9
    ssbHint.rowIndex = Math.floor(h.index as number/9)
    ssbHint.type = h.type as string
    ssbHint.id = CellProperties.createId(ssbHint.rowIndex, ssbHint.columnIndex)
    return ssbHint
  }
}

export default ServiceBridgeHint
