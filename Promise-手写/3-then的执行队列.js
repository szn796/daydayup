/**
 * 执行队列
 * tips1:创建一个属性handlerTask存放then(xx,xx)的xx函数，等到状态改变后再去调用
 * tips2:每一项需要存要执行的函数executor;什么状态下执行;执行后是返回resolve还是返回reject（根据then中是否执行了对应状态的处理函数，函数是否报错）
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
	_changeStatus(status, value) {
		if (this._status !== pending) return;
		this._status = status;
		this._value = value;
	}
	_pushHandler(executor, status, resolve, reject) {
		this.handlerTask.push({
			executor,
			status,
			resolve,
			reject,
		});
	}
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
