/*
 * 原型链继承
 * Student.prototype = new Person()
 * 将Student的原型对象设置为Person的一个实例。
 * 就意味着Student的实例会继承Person实例的属性和方法
 *
 * 缺点：
 * 1.所有的子类共用父类的引用属性（继承同一个Person实例）
 * 2.子类无法传参给父类
 */
// 例子1
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }
// Person.prototype.sayHi = function () {
//   console.log('会说话')
// }
// function Student(name, age, className) {
//   this.name = name
//   this.age = age
//   this.className = className
// }
// // 核心代码！！！！！
// // 改造原型链实现继承
// Student.prototype = new Person()

// const stu = new Student('zs', 7, '一年级')
// stu.sayHi()

// 例子2
/*
 * 缺点：
 * 1.所有的子类共用父类的引用属性
 * 2.子类无法传参给父类
 */
function Parent() {
  this.colors = ['pink', 'red']
  this.name = '小白'
}

function Child() {}
const p1 = new Parent()
Child.prototype = p1
// Child.prototype = new Parent();

const c1 = new Child()
const c2 = new Child()
console.log('szn', 'c1', c1.colors)
console.log('szn', 'c2', c2.colors)
c1.colors.push('blue')
console.log('szn', 'c1', c1.colors)
console.log('szn', 'c2', c2.colors)
c1.colors = ['white']
console.log('szn', 'c1', c1.colors)
console.log('szn', 'c2', c2.colors)
c1.name = '小黑'
console.log('szn', 'c1', c1.name)
console.log('szn', 'c2', c2.name)
