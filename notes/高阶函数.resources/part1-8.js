// 模拟常用的高阶函数 map every some

// map
// const map = (arr,fn) => {
//     let res = [];
//     for(let i of arr){
//         res.push(fn(i))
//     }
//     return res;
// }
let arr = [1,2,3,4]

// let a = map(arr, x => {
//     return x*2
// })
// console.log(a)

// erery
// const every = (arr,fn) => {
//     let result = true;
//     for(let i of arr){
//         if(!fn(i)){
//             result = false
//             break
//         }
//     }
//     return result
// }
// let b = every(arr,(i) => i%1 === 0)
// console.log(b)

// some
const some = (arr,fn) => {
    let result = false;
    for(let i of arr){
        if(fn(i)){
            result = true
            break
        }
    }
    return result
}
let c = some(arr,(i) => i%5 === 0)
console.log(c)