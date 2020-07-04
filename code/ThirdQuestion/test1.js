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
let maybe = Maybe.of([5, 6, 1])
const log = function(val){
    console.log(val)
    return val
}
let ex1 = () => {
    // let res = maybe.map(fp.flowRight(fp.map(fp.curry(fp.add(5)),arr)))
    let res = maybe.map(fp.flowRight(fp.curry(fp.map(fp.curry(fp.add(5)))),log))
    console.log(res)
}
ex1()
