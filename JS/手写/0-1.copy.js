/*
 * @Description 深拷贝、浅拷贝
 */

// const obj = {
//   a: 1,
//   b: [1, 2, 3],
//   c: {
//     d: 2,
//     e: [4, 5, 6],
//   },
// }

// 1.浅拷贝：
// 对于基本数据类型复制值
// 对于引用数据类型复制地址（共享共一个地址数据）
// Object.assign()
// arr.slice(0)
// arr.concat()

// 2.深拷贝：
// 完全复制出一个独立的对象
// 1.序列化JSON.parse(JSON.stringify(obj))
// 缺点：无法处理函数、undefined、循环引用
// JSON.parse(JSON.stringify(obj))

const obj = {
  a: 1,
  b: [1, 2, 3],
  c: {
    d: 2,
    e: [4, 5, 6],
  },
}

// 2.手写方法
function deepClone (obj, map = new WeakMap()) {
  //WeakMap 用于存储已经拷贝过的对象，目的是解决循环引用的问题

  // 基本数据类型，直接返回
  if (obj === null || typeof obj !== 'object') return obj
  // 处理Date
  if (obj instanceof Date) return new Date(obj)
  // 处理RegExp
  if (obj instanceof RegExp) return new RegExp(obj)
  if (map.has(obj)) return map.get(obj) // 检查 WeakMap 中是否已经存在 obj 这个键。如果存在，说明该对象已经被拷贝过了，这通常意味着出现了循环引用（即对象内部引用了自身）,则直接返回之前拷贝好的对象。

  const clone = Array.isArray(obj) ? [] : {} //建立初始空数据

  map.set(obj, clone) //将当前对象作为属性存入map.clone在后续遍历是会被填充数据，并非一个空数据
  /**
   * Q:为什么在这就map.set，而不是等到遍历完再map.set？
   * A:首先要明白存如map就是为了解决循环引用的问题。而在遍历过程中就可能存在循环引用的问题，所以需要再遍历之前就存入map，避免出现循环引用的问题。
   */
  // 遍历对象
  for (let key in obj) {
    //检查 key 是否为 obj 自身的属性，而不是其原型链上的属性。这样可以避免拷贝原型链上的属性。
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map)
    }
  }
  return clone
}

const obj1 = deepClone(obj)
obj1.b.push(99)
console.log('szn', 'obj', obj)
console.log('szn', 'obj1', obj1)
