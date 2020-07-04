// 高阶函数，函数作为参数

// 模拟forEach

/**
 * 
 */
// let forEach = function(fn,arr){
//     for(let i of arr){
//         fn(i) 
//     }
// }
// let forEach = (fn,arr) => {
//     for(let i of arr){
//         fn(i) 
//     }
// }
// let arr = [1,2,3,4];
// forEach((i) => {
//     console.log(i)
// },arr)

// 模拟 filter
// let filter = (fn,arr) => {
//     let res = [];
//     for(let i in arr){
//         if(fn(i)){
//             res.push(i)
//         }
//     }
//     return res
// }
// let res = filter((i) => i%2 === 0,arr)
// console.log(res)

// 函数作为返回值
// 模拟once函数

let once1 = (fn) => {
	console.log(this)
	let sign = false;
	return () => {
		console.log('*********')
		console.log(this)
		console.log('*********')
		if(!sign){
			sign = true;
			return fn.apply(this,arguments)
		}
	}
}
function once2(fn) {
	console.log(this)
	let sign = false;
	return function () {
		console.log('---------')
		console.log(this)
		console.log('---------')
		if(!sign){
			console.log(arguments)
			sign = true;
			return fn.apply(this,arguments)
		}
	}
}
let pay1 = once1((money) => {
	console.log(this)
	console.log(`支付钱财:${money}元`)
});
let pay2 = once2((money,money2) => {
	console.log(this)
	console.log(money)
	console.log(money2)
	console.log(`支付钱财:${money}${money2}元`)
});
// pay1(2)
pay2(2,4)

