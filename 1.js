function deepClone (obj, map = new WeakMap()) {
  // 不是对象类型或者null（基本数据类型，则返回）
  if (!(typeof obj === 'object' && obj !== null)) return obj;
  // 如果是正则或者日期类型，则包装后返回
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  // 判断下是否循环引用
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {}
  map.set(obj, clone);
  for (const key in obj) {
    // 不去获取原型链上的属性
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map)
    }
  }
  return clone;
}
const obj = {
  a: 1,
  b: [1, 2, 3],
  c: {
    d: 2,
    e: [4, 5, 6],
  },
}
const obj2 = deepClone(obj);
obj2.b.push(9)
console.log('szn', 'obj1', obj)
console.log('szn', 'obj2', obj2)