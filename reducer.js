Array.prototype.myReducer = function (fn, init) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
        throw new Error(`${fn} is not a function`);
    }
    // 是否传入可选初始值
    let flag = arguments.length === 1;
    let initIndex = flag ? 1 : 0;
    let acc = flag ? this[0] : init;
    for (let i = initIndex; i < this.length; i++) {
        acc = fn(acc, this[i], i, arr);
    }
    return acc;
}
const arr = [1, 2, 3];
console.log(arr.myReducer((a, b) => a + b, 10))