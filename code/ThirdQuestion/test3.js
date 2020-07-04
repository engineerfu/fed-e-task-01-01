const fp = require('lodash/fp')
class Maybe {
    static of(value) {
        return new Maybe(value)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
})


// 获取 maybe 的函子 的 _value
let getValue = function(val){
    return val._value
}
// 过程结果测试
let log = function(val){
    console.log(val)
    return val
}
let user = {id:2,name:'Albert'}
let ex3 = () => {
    let res = fp.flowRight(fp.first,getValue,log,safeProp('name'))
    return res;
}
ex3(user)
console.log(ex3(user))