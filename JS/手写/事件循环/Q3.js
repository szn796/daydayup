console.log('Start')

setTimeout(() => {
  console.log('Timeout  1')
  Promise.resolve().then(() => console.log('Promise  in Timeout'))
}, 0)

Promise.resolve()
  .then(() => {
    console.log('Promise  1')
    setTimeout(() => console.log('Timeout  in Promise'), 0)
  })
  .then(() => console.log('Promise  2'))

// requestAnimationFrame作为渲染前宏任务执行
requestAnimationFrame(() => console.log('rAF'))

console.log('End')
// Start
// End
// Promise  1
// Promise  2
// rAF
// Timeout  1
// Promise  in Timeout
// Timeout  in Promise
