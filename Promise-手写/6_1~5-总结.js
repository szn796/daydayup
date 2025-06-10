/**
 * 实现带有PromiseA+ 规范的promise（有then）
 */
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';
const runMicroTask = (callback) => {
	if (process && process.nextTick) {
		process.nextTick(callback);
	} else if (MutationObserver) {
		const p = document.createElement('p');
		const observe = new MutationObserver(callback);
		observe.observe(p, {
			childList: true,
		});
		p.innerHTML = 'run';
	} else {
		setTimeout(() => {}, 0);
	}
};
// 判断promise，遵守A+规范， promise是一个对象，并且有then方法
const isPromise = (obj) => {
	return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
};
class myPromise {
	constructor(executor) {
		this._status = pending;
		this._value = undefined;
		this._taskArr = [];
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
		this._runTask();
	}
	_resolve(data) {
		this._changeStatus(fulfilled, data);
	}
	_reject(reason) {
		this._changeStatus(rejected, reason);
	}
	_pushTask(executor, status, resolve, reject) {
		this._taskArr.push({
			executor,
			status,
			resolve,
			reject,
		});
	}
	_runTask() {
		if (this._status === pending) return;
		while (this._taskArr[0]) {
			this._runOneTask(this._taskArr[0]);
			this._taskArr.shift();
		}
	}
	_runOneTask({ executor, status, resolve, reject }) {
		runMicroTask(() => {
			if (this._status !== status) return;
			// 如果不是一个函数，那么值穿透
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
	then(onFulfilled, onRejected) {
		return new Promise((resolve, reject) => {
			this._pushTask(onFulfilled, fulfilled, resolve, reject);
			this._pushTask(onRejected, rejected, resolve, reject);
			this._runTask();
		});
	}
}
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

const p = new myPromise((resolve) => {
	resolve(1);
});

p.then((data) => {
	console.log(data);
	return new myPromise((resolve) => {
		resolve(2);
	});
}).then((data) => {
	console.log(data);
});

// const pro1 = new Promise((resolve) => {
// 	resolve(1);
// });
// pro1
// 	.then((data) => {
// 		console.log(data);
// 		return new myPromise((resolve) => {
// 			resolve(2);
// 		});
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});
