const obj = {
  a: 1,
  b: [1, 2, 3],
  c: {
    d: 2,
    e: [4, 5, 6],
  },
}

const deepClone = (obj, map = new WeakMap()) => {
  // 基本数据类型，则直接返回
  if (typeof obj !== 'object' || obj === null) return obj
  // 处理正则、处理Date
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  // 避免循环引用问题。如果map已经有这个obj这个键了，那么所以有地方循环引用对象了
  if (map.has(obj)) return map.get(obj);

  // 创建初始化空数据
  const clone = Array.isArray(obj) ? [] : {}
  /**
   * Q:为什么在这就map.set，而不是等到遍历完再map.set？
   * A:首先要明白存如map就是为了解决循环引用的问题。而在遍历过程中就可能存在循环引用的问题，所以需要再遍历之前就存入map，避免出现循环引用的问题。
   * clone会在后续被填充值
   */
  map.set(obj, clone)

  // 遍历对象
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map)
    }
  }
  return clone
}
const obj2 = deepClone(obj);
obj2.b.push(9)
console.log('szn', 'obj1', obj)
console.log('szn', 'obj2', obj2)