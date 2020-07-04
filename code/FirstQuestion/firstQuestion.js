let a = function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            var a = 'hello '
            resolve(a)
        },10) 
    })
}
let b = function(a){
    return new Promise((resolve) => {
        setTimeout(() => {
            var b = 'lagou '
            resolve(a+b)
        },10) 
    })
}
let c = function(ab){
    return new Promise((resolve) => {
        setTimeout(() => {
            var c = 'i love u '
            resolve(ab+c)
        },10) 
    })
}

a().then(b).then(c).then(res => {
    console.log(res)
})