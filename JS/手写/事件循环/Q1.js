document.body.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('1'))
  setTimeout(() => console.log('2'), 0)
})

document.body.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log('3')
    setTimeout(() => console.log('4'), 0)
  })
  setTimeout(() => {
    console.log('5')
    Promise.resolve().then(() => console.log('6'))
  }, 0)
})

document.body.click() // 手动触发点击事件
console.log('SyncStart')

// Sync Start → 1 → 3 → 2 → 5 → 6 → 4
