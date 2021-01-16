import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint";
import CellManager from "../../CellManager";
import PatternMapMaker from "./PatternMapMaker";
import PatternMapMakerBoxHiddenSingle from "./PatternMapMakerBoxHiddenSingle"
import PatternMapColumnHiddenSingle from "./PatternMapMakerColumnHiddenSingle";
import PatternMapNakedSingle from "./PatternMapMakerNakedSingle";
import PatternMapRowHiddenSingle from "./PatternMapMakerRowHiddenSingle";

class PatternMapMakerFactory {
  constructor(){}
  static getPatternMapMaker ( hint:ServiceBridgeHint, cellManager:CellManager ): PatternMapMaker {
    if( hint.type == ServiceBridgeHint.typeHiddenSingleBox )
      return new PatternMapMakerBoxHiddenSingle( hint, cellManager )
    if( hint.type == ServiceBridgeHint.typeHiddenSingleRow )
      return new PatternMapRowHiddenSingle( hint, cellManager )
    if( hint.type == ServiceBridgeHint.typeColumnHiddenSingle )
      return new PatternMapColumnHiddenSingle( hint, cellManager )
    if( hint.type == ServiceBridgeHint.typeNakedSingle )
      return new PatternMapNakedSingle( hint, cellManager )
    else
      return new PatternMapMaker( hint, cellManager )
  }
}
export default PatternMapMakerFactory
