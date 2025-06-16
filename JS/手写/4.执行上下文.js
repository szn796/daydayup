// 变量提升在执行上下文的创建阶段，同名函数声明优先于变量声明，但会被后续的变量名赋值覆盖
// case1
console.log(a) // 输出函数体：ƒ a() {}
var a = 1
function a() {}
console.log(a) // 输出 1（变量赋值覆盖函数）

// 解释：具体执行顺序
// function a() {}    // 函数提升
// var a;             // 变量提升（因函数已存在，此处被忽略）
// console.log(a);     // 此时 a 是函数
// a = 1;             // 变量赋值覆盖函数
// console.log(a);

// case2
;(function () {
  console.log(typeof foo) //function
  console.log(typeof bar) //undefined
  var foo = 'Hello'
  var bar = function () {
    return 'World'
  }

  function foo() {
    return 'good'
  }
  console.log(foo, typeof foo) //Hello string
})()
