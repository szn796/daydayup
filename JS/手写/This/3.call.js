/*
 * @Description 手写call
 */
const obj = {
  name: 'obj',
}
function fn(a, b, c) {
  console.log(this.name, a, b, c)
}
fn.call(obj, 1, 2, 3)

Function.prototype.myCall = function (context, ...args) {
  // 确保只有函数能调用,保持和原生一致
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window // 默认绑定全局对象
  const fnKey = Symbol() // 避免属性名冲突
  context[fnKey] = this // 将函数绑定到 context 的属性上
  const result = context[fnKey](...args) // 执行函数
  delete context[fnKey] // 删除临时属性
  return result
}
fn.myCall(obj, 1, 2, 3)
