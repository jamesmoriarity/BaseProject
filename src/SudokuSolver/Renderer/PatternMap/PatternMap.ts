import ServiceBridgeHint from "../../../SudokuBridgeService/ServiceBridgeHint"

class PatternMap {
  hintBackgroundCells:string[]
  hintMatchingCells:string[]
  hint:ServiceBridgeHint
  static PATTERN_STATE_BACKGROUND = "background"
  static PATTERN_STATE_HINTED = "hinted"
  static PATTERN_STATE_SAME_VALUE = "same value"
  static PATTERN_STATE_NONE = ""
  constructor(bgCells:string[], relatedCells:string[], hint:ServiceBridgeHint){
    this.hintBackgroundCells = bgCells
    this.hintMatchingCells = relatedCells
    this.hint = hint
  }
  getAllCellIds = () => {
    return this.hintBackgroundCells.concat(this.hintMatchingCells, this.hint.id)
  }
  static getBlank = () => {
    return new PatternMap([],[], new ServiceBridgeHint())
  }
}
export default PatternMap
