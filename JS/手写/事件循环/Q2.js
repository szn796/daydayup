console.log('Script  start')

// 宏任务1
setTimeout(() => {
  console.log('setTimeout1')
  // 微任务（在宏任务中）
  Promise.resolve().then(() => console.log('Promise  in setTimeout1'))
}, 0)

// 微任务1
Promise.resolve().then(() => {
  console.log('Promise1')
  // 宏任务（在微任务中）
  setTimeout(() => console.log('setTimeout  in Promise1'), 0)
})

// 微任务2
Promise.resolve().then(() => {
  console.log('Promise2')
  // 嵌套微任务
  Promise.resolve().then(() => console.log('Nested  Promise in Promise2'))
})

// 模拟DOM事件
document.body.addEventListener('click', () => {
  console.log('DOM  click event')
})
// 同步触发事件（注意：这会同步执行事件处理函数）
document.body.click()

console.log('Script  end')
// Script  start
// DOM  click event
// Script  end
// Promise1
// Promise2
// Nested  Promise in Promise2
// setTimeout1
// Promise  in setTimeout1
// setTimeout  in Promise1
