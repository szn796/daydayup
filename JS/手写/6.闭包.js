/**
 * 场景1：模块化封装、私有化变量
 */
function createCounter() {
  let count = 0
  return {
    getCount: () => count,
    increment: () => count++,
    decrement: () => count--,
  }
}

const counter = createCounter()
console.log('szn', 'counter.getCount()', counter.getCount())
counter.increment()
console.log('szn', 'counter.getCount()', counter.getCount())
counter.decrement()
console.log('szn', 'counter.getCount()', counter.getCount())

/**
 * 场景2：高阶函数(防抖、节流），利用闭包缓存timer状态
 */
/**
 * 防抖（回城-需要等待一定时间后才会触发）
 * 在n秒后触发，如果重复触发则重新计时
 */
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流（技能释放一次后的冷却）
 * n秒内，只会触发第一次
 */
function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
