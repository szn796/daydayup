var a = 1

function foo() {
  console.log(a)

  function bar() {
    var b = 2
    console.log(a * b)
  }

  bar()
}

function baz() {
  var a = 10
  foo()
}

baz()
