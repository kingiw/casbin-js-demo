// alert("Casbin.js is running!")

console.log("1")
var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; ++i) {
    item = cookies[i].split('=');
    console.log(`${item[0]}: ${item[1]}`);
}

window.document.onload = function() {
    console.log("2")
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; ++i) {
        item = cookies[i].split('=');
        console.log(`${item[0]}: ${item[1]}`);
    }
}