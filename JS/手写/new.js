/*
 * @Description 手写new
 * 1.基于构造函数的原型对象创建一个新的空对象
 * 2.执行这个构造函数，并将构造函数的this绑定到对象上
 * 3.根据构造函数的执行结果类型返回值，
 *  如果是引用数据类型，则返回这个结果。
 *  否则返回创建的对象
 */
function myNew (constructor, ...args) {
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj
}
function Person (name) {
  this.name = name
}
const p1 = new Person('小白');
const p2 = myNew(Person, '小白')

console.log('szn', 'p1', p1)
console.log('szn', 'p2', p2)
