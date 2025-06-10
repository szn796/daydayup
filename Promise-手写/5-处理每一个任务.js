/**
 * 处理每一个执行队列中的任务_handlerOneTask
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
const isPromise = (obj) => {
	return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
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
		this._handlerTask(); //执行队列
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

	_handlerOneTask({ executor, status, resolve, reject }) {
		runMicroTask(() => {
			// 状态一样的才执行
			if (this._status !== status) return;
			// 如果传入的任务不是一个方法,值穿透
			if (typeof executor !== 'function') {
				this._status === fulfilled ? resolve(this._value) : reject(this._value);
				return;
			}
			try {
				const res = executor(this._value);
				if (isPromise(res)) {
					return res.then(resolve, reject);
				} else {
					resolve(res);
				}
			} catch (error) {
				reject(error);
			}
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
			this._handlerTask(); //执行队列
		});
	}
}
// eg:1
const pro1 = new myPromise((resolve) => {
	resolve(1);
});
pro1
	.then((data) => {
		console.log(data);
		return new myPromise((resolve) => {
			resolve(2);
		});
	})
	.then((data) => {
		console.log(data);
	});

// // eg:2
// function delay(duration) {
// 	return new myPromise((resolve) => {
// 		setTimeout(resolve, duration);
// 	});
// }
// (async function () {
// 	console.log('alert');
// 	await delay(2000);
// 	console.log('ok');
// })();
