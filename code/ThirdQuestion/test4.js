
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

// let ex4 = function(n) {
//     if(n){
//         return parseInt(n)
//     }
// }

let ex4 = (x) => {
    return Maybe.of(x).map((y) => {
        return parseInt(y)
    })._value
} 

console.log(ex4(2))
console.log(ex4(undefined))
console.log(ex4(null))
