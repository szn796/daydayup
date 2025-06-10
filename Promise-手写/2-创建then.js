/**
 * 模拟微任务
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
	_resolve(value) {
		this._changeStatus(fulfilled, value);
	}
	_reject(reason) {
		this._changeStatus(rejected, reason);
	}
}
setTimeout(() => {
	console.log(3);
}, 0);
runMicroTask(() => console.log(1));
console.log(2);
