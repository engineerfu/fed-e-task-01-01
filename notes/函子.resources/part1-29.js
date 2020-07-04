const fp = require('lodash/fp')
// class Container {
//     constructor(value) {
//         this._value = value;
//     }
//     map(fn){
//         return new Container(fn(this._value))
//     }
// }

// let res = new Container(5).map((x) => x + 1).map( x => x * x)
// console.log(res)

// class Container {
//     static of(value) {
//         return new Container(value)
//     }
//     constructor(value) {
//         this._value = value;
//     }
//     map(fn){
//         return Container.of(fn(this._value))
//     }
// }

// let res = Container.of(5).map(x => x + 1).map(x => x*x)
// console.log(res)

// 解决null 和 undefined MayBe
// class MayBe {
//     static of(value){
//         return new MayBe(value)
//     }
//     constructor(value) {
//         this._value = value
//     }
//     map(fn){
//         return this.isNothing() ? MayBe.of(null) :  MayBe.of(fn(this._value))
//     }
//     isNothing(){
//         return this._value === null || this._value === undefined
//     }
// }
// let res = MayBe.of(5).map(x => null).map(x => x.split(';'))
// console.log(res)


// either函子 
class Left {
    static of(value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value;
    }
    map(fn){
        return this
    }
}
class Right {
    static of(value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value;
    }
    map(fn){
        return Right.of(fn(this._value))
    }
}

// let r1 = Right.of(12).map(x => x+2);
// let l1 = Left.of(12).map(x => x+2);
// console.log(r1)
// console.log(l1)
function parsJSON(str){
    try {
        return Right.of(JSON.parse(str))
    } catch (error) {
        return Left.of({error:error.message})
    }
}
// let r = parsJSON('{name:zs}')
let r = parsJSON('{"name":"zs"}')
console.log(r)

// IO函子 构造函数中保存的是一个函数
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
}
let res1 = IO.of(process).map(p => p.execPath)
console.log(res1)
console.log(res1._value())
