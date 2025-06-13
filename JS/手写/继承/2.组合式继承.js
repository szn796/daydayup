/*
 * 组合式继承
 * 原型链继承 + 借用构造函数（call）
 * 
 * 实现： Child.prototype = new Parent() 、 Parent.call(this,name)
 * 
 * 缺点：
 * 1.父类构造函数被调用了两次（一次生成原型-Parent.call(this, name)，一次生成实例-new Parent();）
 * 2.子类原型上存在冗余的父类示例属性 - new Parent()
 * 
 * 解决了：
 * 1.原型链继承中,无法传参给父元素的问题
 * 2.原型链继承中,所有子元素共享父元素实例的问题
 * 
 * Q:为什么用call就不会共享父类的引用属性
 *   a. 将父类实例属性赋值到子类实例，而非存储在原型链上
 *   b. 通过这样实现属性复制而非共享
 * 
 * Q:如何理解call
 * 函数.call(对象) = “请对象临时当一次函数的老板，函数内部 this 就听对象的指挥”
 */
function Parent (name) {
  this.name = name;
  this.nums = [1, 2, 3]
}
Parent.prototype.sayName = function () { // 父类原型方法 
  console.log(this.name);
};
function Child (name) {
  Parent.call(this, name)
}

Child.prototype = new Parent();

// 测试 
const c1 = new Child("Tom");
const c2 = new Child("Jerry");
// console.log('szn', 'c1', c1)
// console.log('szn', 'c2', c2)
// c1.nums.push(4)
// console.log('szn', 'c1', c1)
// console.log('szn', 'c2', c2)
// console.log(c1.name);  // "Tom"（实例属性）
// console.log(c1.__proto__);  // { name: undefined }（但原型链上有冗余属性）






function p (name) {
  this.name = name;
}
p.prototype.sayName = function () {
  console.log(this.name)
}
function c (name) {
  p.call(this, name);
}
c.prototype = new p();
const c11 = new c('11')
console.log('szn', 'c11', c11)