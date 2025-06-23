/*
 * @Description 手写apply
 */
const obj = {
  name: 'obj',
}
function fn(a, b, c) {
  console.log(this.name, a, b, c)
}
fn.apply(obj, [1, 2, 3])

Function.prototype.myApply = function (obj, args) {
  // 确保只有函数能调用,保持和原生一致
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  obj = obj || window //如果obj不存在，那么则指向全局对象

  // 在对象上执行函数，obj.fn()。让函数中的this指向对象
  // 具体做法：让fn添加到obj中并执行
  const fnKey = Symbol() //1.通过symbol创建属性，避免属性冲突
  obj[fnKey] = this //2.将函数添加到对象中
  const result = obj[fnKey](...args) //3.通过对象执行函数
  delete obj[fnKey] //4.删除临时属性
  return result //5.返回允许结果
}

fn.myApply(obj, [1, 2, 3])
