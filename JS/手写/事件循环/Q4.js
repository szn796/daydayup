async function async1() {
  console.log('async1  start')
  await async2()
  // async2同步执行，async1 end转为微任务
  // await async2会立马执行，但后面的相当于then后的
  console.log('async1  end')
}

async function async2() {
  console.log('async2')
}

console.log('script  start')

setTimeout(() => console.log('setTimeout'), 0)

async1()

new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => console.log('promise2'))

console.log('script  end')
// script  start
// async1  start
// async2
// promise1
// script  end
// async1  end
// promise2
// setTimeout
