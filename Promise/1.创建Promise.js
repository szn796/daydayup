function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve('成功了')
            } else {
                reject('失败了')
            }
        }, time);
    })
}
delay(300).then(
    (data) => {
        console.log('成功了', data);
    },
    (reason) => {
        console.log('失败了', reason);
    }
)