// lodash中的高阶函数

const _ = require('lodash');

function getSum(a,b,c){
    return a+b+c
}

let currSum = _.curry(getSum)

console.log(currSum(1)(2,3))
console.log(currSum(1,2)(3))

// 柯里化案例
// 匹配字符串中空白字符
let match = _.curry((reg,str) => str.match(reg))

let haveSpace = match(/\s+/g)
let hanvNumber = match(/\d+/g)

let data = 'hello world'

console.log(haveSpace(data))
console.log(hanvNumber(data))

let strArr = ['hello world','hello_world']
// 匹配数组中含有空字符串的元素
let arrHandle = _.curry((fn,arr) => arr.filter(fn))

let arrHaveSpace = arrHandle(haveSpace);
console.log(arrHaveSpace(strArr))


// curry的原理
function curry(func) {
    return function currFn(...args){
        // 判断实参和形参的个数
        if(args.length < func.length){
            return function (){
                return currFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}
let currSumMy = curry(getSum);
let sum2 = currSumMy(2);
console.log(sum2(2,5));
console.log(currSumMy(1)(2,3))