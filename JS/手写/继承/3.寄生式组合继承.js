/*
 * @Description 寄生式组合继承
 * 继承的最佳实现方式之一
 * 缺点：
 * 1.Child.prototype的原始属性和方法会丢失
 */
function Parent (name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child (name) {
  // 通过call实现父元素属性的复制而不是共享
  // 通过call实现子元素传参给父元素
  Parent.call(this, name); // 只调用一次父类构造函数 
}
// 关键优化：仅复制父类原型方法 (这样就不会执行两次Parent())
Child.prototype = Object.create(Parent.prototype);
// 由于Child.prototype = Object.create(Parent.prototype);
// 会导致Child.prototype.constructor指向Parent
Child.prototype.constructor = Child; // 修复构造函数指向 

// 测试 
const c1 = new Child("Lucy");
console.log(c1.name);  // "Lucy"
console.log(c1.__proto__);  // Child.prototype对象，不是undefined

// 更详细的测试
console.log('=== 详细测试 ===');
console.log('c1.name:', c1.name);  // "Lucy"
c1.sayName();  // "Lucy" - 继承了父类方法
console.log('c1 instanceof Child:', c1 instanceof Child);  // true
console.log('c1 instanceof Parent:', c1 instanceof Parent);  // true
console.log('c1.__proto__ === Child.prototype:', c1.__proto__ === Child.prototype);  // true
console.log('c1.__proto__.__proto__ === Parent.prototype:', c1.__proto__.__proto__ === Parent.prototype);  // true
console.log('c1.constructor === Child:', c1.constructor === Child);  // true

// 验证没有多余的父类实例属性
console.log('Child.prototype.name:', Child.prototype.name);  // undefined - 证明没有冗余属性