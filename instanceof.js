function myInstanceOf(obj, constructor) {
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        if (proto === constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

function Person(name) {
    this.name = name;
}
const p = new Person('xx')
console.log(myInstanceOf(p, Person)) 