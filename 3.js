function deepClone (obj, map = new WeakMap()) {
  // 返回不是引用数据类型的数据
  if (!(typeof obj === 'object' && obj !== null)) return obj;

  // 处理正则和Date
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  if (map.has(obj)) return map.get(obj);

  // 创建新的容器，存放克隆数据
  const clone = Array.isArray(obj) ? [] : {}
  // 后续clone数据会在遍历中写入
  map.set(obj, clone);

  // 遍历
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone
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