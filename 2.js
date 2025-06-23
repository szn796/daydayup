class Calculator {
  static add() {
    console.log(this === Calculator)
  }
  add2() {
    console.log(this === Calculator)
  }
  multiply() {
    console.log(this instanceof Calculator)
  }
}

const calc = new Calculator()
Calculator.add() // 输出？
// Calculator.add2() // 输出？
calc.multiply.call(null) // 输出？（非严格模式
