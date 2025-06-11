/*
 * @Description 手写instanceof
 */

function myInstanceOf (obj, constructor) {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false
}



console.log(myInstanceOf(1, Number));
console.log(myInstanceOf(1, String));
console.log(myInstanceOf([], Array));
console.log(myInstanceOf([], Object));
console.log([] instanceof Object);
