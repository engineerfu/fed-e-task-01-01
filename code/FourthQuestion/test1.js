const PENDING = 'pending'
const FULFILED = 'fulfiled'
const REJECT = 'reject'

// 基本 =》 异步 =》 then多次调用 => 链式 => 同个promise对象识别
class MyPromise {
    // 成功之后的值
    value = undefined
    // 失败之后的原因
    reson = undefined

    // (异步)成功回调
    // successCallback = undefined
    // (异步)失败回调
    // failCallback = undefined

    // (then多次调用)
    successCallback = [];
    failCallback = [];

    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    status = PENDING;
    resolve = value => {
        // 如果状态不是等待组织程序向下执行
        if (this.status != PENDING) return
        this.status
            = FULFILED
        // 保存成功之后的值
        this.value = value;

        // (异步)判断成功回调是否存在
        // this.successCallback && this.successCallback(this.value)

        // (then多次调用)
        while (this.successCallback.length) {
            this.successCallback.shift()()
        }
    }
    reject = reson => {
        if (this.status != PENDING) return
        this.status
            = REJECT
        //  保存失败之后的原因
        this.reson = reson

        // (异步)判断失败回调是否存在
        // this.failCallback && this.failCallback(this.value)

        // (then多次调用)
        while (this.failCallback.length) {
            this.failCallback.shift()()
        }
    }
    then(successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value
        successCallback = failCallback ? successCallback : reason => {throw reason}
        // (链式）
        let promise2 = new MyPromise((resolve,reject) => {
            if (this.status == FULFILED) {
                setTimeout(() => {
                    try {
                        // (链式）
                        let x = successCallback(this.value)
                        // resolve(x)
                        resolvePromise(promise2 , x,resolve,reject)
                    } catch (error) {
                        reject(e)
                    }
                },0)
            } else if (this.status == REJECT) {
                setTimeout(() => {
                    try {
                        // (链式）
                        let x = failCallback(this.reson)
                        // resolve(x)
                        resolvePromise(promise2 , x,resolve,reject)
                    } catch (error) {
                        reject(e)
                    }
                },0)
            } else {
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            // (链式）
                            let x = successCallback(this.value)
                            // resolve(x)
                            resolvePromise(promise2 , x,resolve,reject)
                        } catch (error) {
                            reject(e)
                        }
                    },0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            // (链式）
                            let x = failCallback(this.reson)
                            // resolve(x)
                            resolvePromise(promise2 , x,resolve,reject)
                        } catch (error) {
                            reject(e)
                        }
                    },0)
                })
            }
        });
        // // 状态判断
        // if(this.status == FULFILED){
        //     successCallback(this.value)
        // }else if(this.status == REJECT){
        //     failCallback(this.reson)
        // }else{

        //     // (异步)当异步的时候
        //     // (异步)存储成功或者失败回调
        //     // this.successCallback = successCallback
        //     // this.failCallback = failCallback

        //     // (then多次调用)
        //     this.successCallback.push(successCallback)
        //     this.failCallback.push(failCallback) 
        // }

        // 链式）
        return promise2
    }
    // all方法 根据 promise 语法可知 首先all是一个静态方法，接受一个数组的参数，返回一个promise对象
    // 先判断参数数组中各元素是什么
    static all(array){
        let result = [];
        let index = 0;
        return new MyPromise((resolve,reject) => {
            for(let i = 0; i < array.length; i++){
                let curr = array[i];
                if(curr instanceof MyPromise){
                    curr.then(value => addData(i,value),reason => reject(reason))
                }else{
                    // 普通值
                    addData(i , array[i])
                }
            }
            function addData(key , value){
                result[key] = value
                index++
                if(index === array.length){
                    resolve(result)
                }
            }
        })
    }
    static resolve(value){
        if(value instanceof MyPromise) return value
        return new MyPromise((resolve) => resolve(value))
    }

    finally(callback){
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value)
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => {throw reason})
        })
    }

    catch(failCallback){
        return this.then(undefined , failCallback)
    }
}

// （链式）判断x是否是一个promise对象
let resolvePromise = function(promise2 , x,resolve,reject){
    // (接收到相同primise对象处理)
    if(promise2 === x){
        return reject(new TypeError('error'))
    }
    if(x instanceof MyPromise){
        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}



// test
// let mypromisObj = () => new MyPromise((resolve, reject) => {
//     resolve('成功链式');
// })
let mypromisObj = function(){
    return new MyPromise((resolve, reject) => {
        resolve('成功链式');
    })
}


let myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    },2000)
    // throw new Error('ece error')
    // resolve('成功');
    // reject('失败')
})


// let p1 = myPromise.then(res => {
//     console.log(res)
//     return p1
// })

// p1.then(res => {
//     console.log(res)
// },reason => {
//     console.log(reason.message)
// })

myPromise.then(value => {
    console.log(value)
    return '666'
},reason => {
    console.log(reason)
}).then(res => {
    console.log(res)
})