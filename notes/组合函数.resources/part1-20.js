const _  = require('lodash')
// 函数组合
function compose(f,j){
    return function(value){
        return f(j(value))
    }
}

function reverse(arr){
    return arr.reverse()
}

function first(arr){
    return arr[0]
}

const toUpper = s => s.toUpperCase()
let last = compose(first,reverse)

let arr = ['1','2','3','5']
// console.log(last(arr))

// lodash的函数组合方法 flowRight
let arr2 = ['no','hello','jokeb','lala']
let lodLast = _.flowRight(toUpper,first,reverse)
// console.log(lodLast(arr2))

// 函数组合的原理
//  ...args 当参数不确定的时候 代表剩余参数
 function lodCompose (...args) {
    return function(value) {
        return args.reverse().reduce(function (acc,fn) {
            return fn(acc)
        },value)
    }
 }
 let lodComposeMy = lodCompose(toUpper,first,reverse);
//  console.log(lodComposeMy(arr2))

//  Es6
let lodCompose6 = (...args) => (value) => args.reverse().reduce((acc,fn) => fn(acc),value)
console.log(lodCompose6(arr2))

// 调试组合函数
let arr3 = ['no','hello','jokeb','lala']
let lodLastDebugg = _.flowRight(toUpper,first,reverse)

// 将 NEVER SAY DIE => never-say-die
// const log = (x) => {
//     console.log(x);
//     return x
// }
const trace = _.curry((tag , v) => {
    console.log(tag,v)
    return v
})
const split = _.curry((sep,str) => _.split(str,sep))

const join = _.curry((sep,arr) => _.join(arr,sep))

// const handle = _.flowRight(join('-') , _.toLower , split(' '))

const map = _.curry((fn,arr) => _.map(arr,fn))

// const handle = _.flowRight(join('-') , map(_.toLower) , split(' '))
// 调试
const handle = _.flowRight(join('-') ,trace('map'), map(_.toLower) ,trace('split'), split(' '))

console.log(handle('NEVER SAY DIE'))


// map方法
let testArr = ['12','8','10']
let res1 = testArr.map(x => parseInt(x))
let res2 = testArr.map(parseInt)
console.log(res1)
// 结果错误： 原因： map 会将 三个参数（当前项，下标，数组本身） 传给 map的回调函数， 当parseInt接受这三个参数时（将第二个参数解析为进制）
console.log(res2)