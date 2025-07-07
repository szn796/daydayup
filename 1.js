function Person (name) {
  this.name = name;
}
const p1 = new Person('name')

const myNew = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
}

const p2 = myNew(Person, 'name')