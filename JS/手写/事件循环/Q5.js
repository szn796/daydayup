console.log('Start')

setTimeout(() => console.log('Timeout'), 0)

Promise.resolve().then(() => {
  console.log('Promise  1')
  requestAnimationFrame(() => console.log('rAF  in Promise'))
})

queueMicrotask(() => console.log('queueMicrotask'))

document.addEventListener('DOMContentLoaded', () => {
  Promise.resolve().then(() => console.log('Promise  in DOMContentLoaded'))
})

console.log('End')
// Start
// End
// Promise  1
// queueMicrotask
// Promise  in DOMContentLoaded'
// rAF  in Promise
// Timeout
