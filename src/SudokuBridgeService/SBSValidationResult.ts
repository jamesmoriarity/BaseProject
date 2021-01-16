class SBSValidationResult{
		isValid:Boolean
		isComplete:Boolean
		invalidCells:Number[]
		constructor(isValid:Boolean, invalidCells:Number[], isComplete:Boolean){
			this.isValid = isValid
			this.invalidCells= invalidCells
			this.isComplete = isComplete
		}
}

export default SBSValidationResult
