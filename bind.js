Function.prototype.myBind = function (ctx, ...args) {
    return function A(...args2) {
        if (Object.getPrototypeOf(A) === this) {
            return new fn(...[...args, ...args2])
        } else {
            return fn.call(ctx, ...[...args]);
        }
    }
}
function fn(a, b) {
    console.log(this, a, b)
}
const obj = {
    test: 'test'
}
fn.myBind(obj, 1, 2)()