// var的不足一(1_var)： 

var arr = [];
for(var i = 0; i < 10; i++) {
    console.log('out' + i);
    arr[i] = function() {
        console.log('in' + i);
    }
}
arr[8]();


// let KO 不足一(1_let)
var arr = [];
for(let i = 0; i < 10; i++) {
    console.log('out' + i);
    arr[i] = function() {
        console.log('in' + i);
    }
}
arr[8]();

// var 不足二(2_var )：

var a = 1;
(function() {
    console.log(a);
    var a = 2;
})();  //undefined


var a = 1;
(function() {
    var a;
    console.log(a);
    a = 2;
})();


var a = 1;
(function() {
    alert(a);
    let a = 2;
})(); //报错，未定义


