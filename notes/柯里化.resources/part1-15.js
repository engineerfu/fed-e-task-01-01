function checAge (age){
    let mini = 18;
    return age >= mini
}

// 普通的纯函数
function checkAge (age,min){
    return age >= min
}

// 柯里化改造
function klCheckAge(min){
    return function(age){
        return age >= min
    }
}
let klCheckAge18 = klCheckAge(18);
console.log(klCheckAge18(22))
console.log(klCheckAge18(24))
console.log(klCheckAge18(10))

// es6
let esCheckAge = (min) => (age) => age >= min;
let esCheckAge18 = esCheckAge(18)
console.log(esCheckAge18(22))
console.log(esCheckAge18(24))
console.log(esCheckAge18(10))
