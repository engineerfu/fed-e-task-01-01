class Container {
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value;
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}
const fp = require('lodash/fp')

let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])

let ex2 = () => {
    let res = xs.map(fp.flowRight(fp.first))._value
    console.log(res)
}
ex2()