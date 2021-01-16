import CellShell from "./Renderer/CellShell";
import CellShellState from "./Renderer/CellShellState";
import PatternMap from "./Renderer/PatternMap/PatternMap";

class HistoryEvent{
  cellShell:CellShell
  newState:CellShellState
  oldState:CellShellState
  constructor(cellShell:CellShell, oldState:CellShellState, newState:CellShellState){
    this.cellShell = cellShell
    this.oldState = HistoryEvent.scrubState(oldState)
    this.newState = HistoryEvent.scrubState(newState)
  }
  static scrubState = (state:CellShellState) => {
    state.selected = false
    state.patternMapState = PatternMap.PATTERN_STATE_NONE
    return state
  }
}

class HistoryManager{
  events:HistoryEvent[]
  cursor:number
  constructor(){
    this.cursor = 0
    this.events = []
  }
  clear = () => {
    this.cursor = 0
    this.events = []
  }
  reportCellStateChange = (cellShell:CellShell, oldState:CellShellState, newState:CellShellState) => {
    this.addEvent(new HistoryEvent(cellShell, oldState, newState))
  }
  addEvent = (historyEvent:HistoryEvent) => {
    this.removeEventsAfterCursor()
    this.events.push(historyEvent)
    this.cursor = this.events.length - 1 // top of array
  }
  removeEventsAfterCursor = () => {
    let start:number = this.cursor + 1
    let numOfElementsToSplice = this.events.length - start
    if(numOfElementsToSplice > 0){ this.events.splice(start, numOfElementsToSplice) }
  }
  undoLastEvent = () => {
    if(this.cursor < this.events.length && this.cursor >= 0){
      let event:HistoryEvent = this.events[this.cursor]
      event.cellShell.updateState(event.oldState)
      if(this.cursor >= 0) { this.cursor-- }
    }
  }
  redoNextEvent = () => {
    if(this.events.length > 0 && this.cursor < this.events.length - 1){
      this.cursor++
      let event:HistoryEvent = this.events[this.cursor]
      event.cellShell.updateState(event.newState)
    }
  }
}
export default HistoryManager
