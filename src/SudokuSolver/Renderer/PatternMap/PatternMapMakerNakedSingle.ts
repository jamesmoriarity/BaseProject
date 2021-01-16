import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"
import CellManager from "../../CellManager"
import PatternMapMaker from "./PatternMapMaker"

class PatternMapMakerNakedSingle extends PatternMapMaker{
  constructor(hint:ServiceBridgeHint, cellManager:CellManager){
    super(hint, cellManager)
  }
  makeMap = () =>{
    return this.map
  }
}
export default PatternMapMakerNakedSingle
