/**
 * Promise：状态变化
 * tips1:executor里面的两个方法需要bind(this)，因为后续在promise中是全局调用，this会执行window
 * tip2:通过try catch包裹executor，并在catch中执行reject方法。
 */
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';
class myPromise {
  constructor(executor) {
    this._status = pending
    this._value = undefined
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }
  _changeStatus(status, value) {
    if (this._status !== pending) return;
    this._status = status;
    this._value = value
  }
  _resolve(value) {
    this._changeStatus(fulfilled, value)
  }
  _reject(reason) {
    this._changeStatus(rejected, reason)
  }
}
console.log(new Promise((resolve, reject) => {
  // resolve(123);
  // reject('err')
  throw new Error('123')
}));
console.log(new myPromise((resolve, reject) => {
  // resolve(123);
  // reject('err')
  throw new Error('123')
}))