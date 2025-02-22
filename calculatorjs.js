class Calculator{
  constructor(previousOperand, CurrentOperand){
    this.previousOperandElement = previousOperand;
    this.CurrentOperandElement = CurrentOperand;
    this.clear();
  }
  clear(){
    this.CurrentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;

  }
  delete(){
    this.CurrentOperand = this.CurrentOperand.toString().slice(0,-1);
  }
  appendNumber(number){
    if(number === '.' && this.CurrentOperand.includes('.')){
      return;
    }else{
      this.CurrentOperand = this.CurrentOperand.toString() + number.toString()
    }
  }
  chooseOperation(operation){
    if(this.CurrentOperand === '')return
      if(this.previousOperand !== ''){
        return this.compute()
      }
      this.operation = operation
      this.previousOperand = this.CurrentOperand
      this.CurrentOperand = ''
  }
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.CurrentOperand)

    if(isNaN(prev) || isNaN(current)) return;

    switch(this.operation){
      case '+':
        computation = prev + current;
        break
        case '-':
        computation = prev - current;
        break
        case '*':
        computation = prev * current;
        break
        case '\u00F7':
        computation = prev / current;
        break
        default:
          return
    }
    this.CurrentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ''

  }
  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(('.')[0]))
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay
    if(isNaN(integerDigits)){
      integerDisplay = ''
    }else{
      integerDisplay = integerDigits.toLocaleString('en' ,{maximumFractionDigit:0})
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
  }
  updateDisplay(){
    this.CurrentOperandElement.innerText = this.getDisplayNumber(this.CurrentOperand)

    if(this.operation != null){
      this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
      this.previousOperandElement.innerText = ''
    }
  }
}

document.addEventListener('DOMContentLoaded',function(){
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalButton = document.querySelector('[data-equals]')
  const deleteButton  = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperand = document.querySelector('[data-previous-operand]')
  const CurrentOperand = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperand,CurrentOperand)

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  operationButtons.forEach(button => {
    button.addEventListener('click',() => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
     
    })
  })

  equalButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
  })

  deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  allClearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
  })
})