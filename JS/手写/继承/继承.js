// 原型链继承
// 缺点：
// 1.子元素无法向父元素传参
// 2.
function Parent(name){
  this.name = name;
  this.xiaoming = '小明';
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function(){
  console.log(this.name);
}

function Child( age){
  this.age = age;
}
Child.prototype = new Parent();

const child = new Child(18);
const child2 = new Child(20);
console.log(child.name);
console.log(child.age);
console.log(child.colors);
console.log(child.xiaoming);
console.log(child2.xiaoming);
child.xiaoming = '小红';
console.log(child.xiaoming);
console.log(child2.xiaoming);
child.sayName();

console.log(child instanceof Parent);
console.log(child instanceof Child);