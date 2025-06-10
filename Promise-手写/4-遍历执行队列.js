/**
 * 遍历执行队列
 * tips:触发时间有两个 1.改变状态的时候（改变了任务后，就去看看有没有需要执行的）
 *                     2.定义then回调的时候（可能这时候的状态已经确定了）
 */
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';
//  模拟微任务
const runMicroTask = (callback) => {
	// node环境的微任务
	if (process && process.nextTick) {
		process.nextTick(callback);
	} else if (MutationObserver) {
		// 模拟浏览器环境
		const p = document.createElement('p');
		const observe = new MutationObserver(callback);
		observe.observe(p, {
			childList: true, //观察该元素内部的变化
		});
		p.innerHTML = '1';
	} else {
		setTimeout(callback, 0);
	}
};
class myPromise {
	constructor(executor) {
		this._status = pending;
		this._value = undefined;
		this.handlerTask = [];
		try {
			executor(this._resolve.bind(this), this._reject.bind(this));
		} catch (error) {
			this._reject(error);
		}
	}
	/**
	 *
	 * @param {*} status 状态
	 * @param {*} value 值
	 */
	_changeStatus(status, value) {
		if (this._status !== pending) return;
		this._status = status;
		this._value = value;
	}
	/**
	 *
	 * @param {*} executor 执行函数
	 * @param {*} status 对应的状态
	 * @param {*} resolve 根据执行函数是否报错，改变promise的状态
	 * @param {*} reject 根据执行函数是否报错，改变promise的状态
	 */
	_pushHandler(executor, status, resolve, reject) {
		this.handlerTask.push({
			executor,
			status,
			resolve,
			reject,
		});
	}
	/**
	 * 处理执行队列-遍历执行队列的任务
	 */
	_handlerTask() {
		if (this._status === pending) return;
		// 执行后“删除”该项，每次都删除第一项，这样处理，来避开数组塌陷问题
		while (this.handlerTask[0]) {
			const curTask = this.handlerTask[0];
			this._handlerOneTask(curTask);
			this.handlerTask.shift();
		}
	}
	_handlerOneTask() {}
	_resolve(value) {
		this._changeStatus(fulfilled, value);
	}
	_reject(reason) {
		this._changeStatus(rejected, reason);
	}

	then(onFulfilled, onRejected) {
		return new myPromise((resolve, reject) => {
			this._pushHandler(onFulfilled, fulfilled, resolve, reject);
			this._pushHandler(onRejected, rejected, resolve, reject);
		});
	}
}
const p = new myPromise((resolve) => {
	setTimeout(() => {
		resolve(1);
		console.log('p', p);
	}, 100);
});
p.then(
	function A1() {},
	function A2() {}
);
p.then(
	function B1() {},
	function B2() {}
);
// console.log(p);
