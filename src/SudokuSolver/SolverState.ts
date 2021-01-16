import CellProperties from "./CellProperties"
class SolverState {
  inputMode:string
  constructor(){
    this.inputMode = CellProperties.MODE_VALUE
  }
}
export default SolverState
