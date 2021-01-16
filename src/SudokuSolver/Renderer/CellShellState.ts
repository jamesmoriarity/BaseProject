import PatternMap from "./PatternMap/PatternMap"

class CellShellState{
	patternMapState:string = PatternMap.PATTERN_STATE_NONE
	selected:Boolean = false
	pencilValues:Map<string, boolean> = new Map()
	centerValues:Map<string, boolean> = new Map()
	value:string
	constructor(value:string){
		this.value = value  //TEST test that the value passsed in is the value set
	}
}
export default CellShellState
