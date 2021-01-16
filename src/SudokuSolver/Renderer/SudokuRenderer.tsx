import React from "react"
import SudokuSolver from "../SudokuSolver"
import CellShell from "./CellShell"
import CellProperties from "../CellProperties"
import SolverState from "../SolverState"

class SudokuRenderer{
		solver!: SudokuSolver
		constructor(solver:SudokuSolver){  // expects a RenderClient interface
			this.solver = solver
		}
		getState = () => {
			return this.solver.state as SolverState
		}
		render = () => {
			return	<div id="_sudoku">
								<div>
									{this.solver.greeting}
								</div>
								<div id="grid">
									{this.getTableGrid()}
								</div>
								<div id="new_game_shell">
									<button id="new_game_btn"	onClick={this.solver.newPuzzle}	>New Puzzle</button>
									<button id="reset_btn" 		onClick={this.solver.reset}    	>Reset</button>
									<button id="clear_btn" 		onClick={this.solver.clear}    	>Clear</button>
									<button id="undo_btn" 		onClick={this.solver.undo}			>Undo</button>
									<button id="redo_btn" 		onClick={this.solver.redo}			>Redo</button>
								</div>
								<div id="validate">
									<button id="validate_btn" 			onClick={this.solver.validate}	>Validate</button>
									<button id="get_hint_btn" 			onClick={this.solver.getHint} 	>Get Hint</button>
								</div>
								<div>
										<button id="mode_value_btn" 	className={ this.getButtonClassForMode(CellProperties.MODE_VALUE) } 	onClick={ () => this.solver.setMode(CellProperties.MODE_VALUE) }	>Value Mode</button>
										<button id="mode_pencil_btn" 	className={ this.getButtonClassForMode(CellProperties.MODE_PENCIL) } 	onClick={ () => this.solver.setMode(CellProperties.MODE_PENCIL) }	>Pencil Mode</button>
										<button id="mode_center_btn" 	className={ this.getButtonClassForMode(CellProperties.MODE_CENTER) } 	onClick={ () => this.solver.setMode(CellProperties.MODE_CENTER) }	>Center Mode</button>
								</div>
							</div>
		}
		getTableGrid = () => {
			let rows = this.solver.getCellPropertiesGrid().map(this.renderTableRow)
			return <table cellPadding="0" cellSpacing="0"><tbody>{rows}</tbody></table>
		}
		renderTableRow = (row:CellProperties[]) => {
			return <tr key={"row" + row[0].rowIndex}>{ row.map(this.renderTableCell) }</tr>
		}
		renderTableCell = (cellProps:CellProperties) => {
			return <td key={"cell" + cellProps.id}><CellShell {...cellProps}/></td>
		}
		getButtonClassForMode = (mode:string) => {
			return (this.getState().inputMode == mode) ? "highlight_button" : ""
		}
	}

	export default SudokuRenderer
