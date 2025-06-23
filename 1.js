const obj = {
  name: 'obj',
}
function fn(a, b, c, d) {
  console.log('1', this.name, a, b, c, d)
  return {
    name: 'obj222',
  }
}
// fn(1, 2, 3)
// 改变this的指向：apply、bind、call
// fn.apply(obj, [1, 2, 3]);
// fn.bind(obj, 1, 2, 3)()
// fn.call(obj, 1, 2, 3)

Function.prototype.myApply = function (obj, args) {
  if (typeof this !== 'function') {
    throw new Error('Error')
  }
  const fnKey = Symbol() //创建一个symbol属性
  obj[fnKey] = this //把fn绑定到obj上
  const result = obj[fnKey](...args) // 执行fn
  delete obj[fnKey] //删除属性
  return result //返回
}
// fn.myApply(obj, [1, 2, 3]);
Function.prototype.myCall = function (obj, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Error')
  }
  const fnKey = Symbol()
  obj[fnKey] = this
  const result = obj[fnKey](...args)
  delete obj[fnKey]
  return result
}
// fn.myCall(obj, 1, 2, 3)

Function.prototype.myBind = function (context, ...args) {
  // 确保只有函数能调用,保持和原生一致
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const fn = this
  return function Fn(...args2) {
    return fn.apply(
      this instanceof Fn ? new fn(...args2) : context,
      args.concat(args2)
    )
  }
}
// fn.myBind(obj, 1, 2, 3)()
const callback = fn.myBind(obj, 1, 2)
new callback(3, 4)
callback(3, 4)
