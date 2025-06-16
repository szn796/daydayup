// Q1
// var x = 10
// function bar() {
//   var x = 20 // 局部变量
//   function foo() {
//     console.log(x) // 访问哪个 x？
//   }
//   foo() // 调用 foo
// }

// bar() // 输出 20

// Q2 ！！！
var x = 10
function foo() {
  console.log(x) // 访问哪个 x？
}
function bar() {
  var x = 20 // 局部变量
  foo() // 调用 foo
}

bar() // 输出 10，而非 20
