const {compose,curry} = require('folktale/core/lambda')
const {toUpper,first,split,find} = require('lodash/fp')
const { task } = require('folktale/concurrency/task')
const fs = require('fs')
const fp = require('lodash/fp')

// let f = curry(2,(x,y) => x + y)
// console.log(f(2)(3))
// console.log(f(2,3))

function readFile(filename){
    return task(resolver => {
        console.log('duwenjian')
        fs.readFile(filename,'utf-8',(err,data) => {
            console.log('chufa')
            if(err) resolver.reject(err)
            resolver.resolve(data)
        })
    })
}

// let m = readFile('package.json')
// .map(split('\n'))
// .map(x => {console.log('zhonjgian'); return x})
// .map(find(x => x.includes('version')))
// .run()
// .listen({
//     onRejected:err => {
//         console.log(err)
//     },
//     onResolved:value => {
//         console.log('dd')
//         console.log(value)
//     }
// })
// console.log(m)

// IO函子的问题
class IO {
    static of(value){
        return new IO(function (){
            return value
        })
    }
    constructor(fn){
        this._value = fn
    }
    map(fn){
        return new IO(fp.flowRight(fn,this._value))
    }
    // 改造 monad
    join(){
       return this._value()
    }

    flatMap(fn){
        return this.map(fn).join()
    }
}
// 读写文件
function readFileCur(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8')
    })
}
function print(x){
    return new IO(function(){
        console.log(x)
        return x
    })
}
let cat = fp.flowRight(print,readFileCur);

// console.log(cat)
// console.log(cat('package.json'))
// console.log(cat('package.json')._value())
// console.log(cat('package.json')._value()._value())

let r = readFileCur('package.json').flatMap(print).join()
console.log(r)



