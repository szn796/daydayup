Function.prototype.myCall = function (ctx, ...args) {
    ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
    const key = Symbol('key');
    Object.defineProperty(ctx, key, {
        value: this,
        enumerable: false
    })
    const res = ctx[key](...args);
    delete ctx[key];
    return res;
}
function fn(a, b) {
    console.log(this, a, b);
}
const obj = {
    test: 'test'
}
console.log(fn.myCall(obj, 3, 4))