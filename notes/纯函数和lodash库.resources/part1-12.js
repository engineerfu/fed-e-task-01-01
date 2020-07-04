// lodash
// const _ = require('lodash')

// const arr = ['jack','sam','zhansan','lisi']

// console.log(_.first(arr))

// 记忆函数
function getArea (r) {
    console.log(r)
    return Math.PI * r * r
}

// let a = _.memoize(getArea)
// console.log(a(4))
// console.log(a(4))
// console.log(a(4))

// 模拟记忆函数
function memoize (f) {
    let cach = {};
    console.log(cach)
    return function(){
        console.log(arguments)
        let key = JSON.stringify(arguments)
        console.log(key)
        cach[key] = cach[key] || f.apply(this,arguments)
        console.log(cach)
        return cach[key]
    }
}
let b = memoize(getArea);
console.log(b(2,4))
console.log(b(2,4))
console.log(b(2,4))


