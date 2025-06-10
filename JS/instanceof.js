/*
 * @Description 手写instanceof
 */

function myInstanceOf (obj, constructor) {
  if (typeof obj !== 'object' && obj === null) return;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.gerPrototypeOf(proto);
  }
  return false
}
