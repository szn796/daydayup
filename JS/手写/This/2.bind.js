/*
 * @Description 手写bind
 */
const obj = {
  name: 'obj',
}
function fn(a, b, c) {
  console.log(this.name, a, b, c)
}
fn.bind(obj, 1, 2, 3)()

Function.prototype.myBind = function (context, ...args) {
  // 确保只有函数能调用,保持和原生一致
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 通过闭包保留原函数（即调用 myBind 的函数），避免后续执行时丢失
  const fn = this
  // 返回新函数
  return function Fn(args2) {
    return fn.apply(
      // new 操作符兼容：通过 this instanceof Fn 判断是否通过 new 调用。
      // 若为 new，则忽略绑定的 context，用新创建的实例作为 this
      // new > 显式 > 隐式
      this instanceof Fn ? new fn(...arguments) : context,
      args.concat(args2)
    )
  }
}
fn.myBind(obj, 1, 2, 3)()
