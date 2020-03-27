function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function alice() {
    setCookie('CasbinSubject', 'alice');
    alert("Alice, refresh the page and see the changes.");
}

function bob() {
    setCookie('CasbinSubject', 'bob');
    alert('Bob, refresh the page and see the changes.');
}

function anonymous() {
    delCookie('CasbinSubject');
    alert('Anonymous, refresh the page and see the changes.');
}


console.log(`CasbinSubject: ${getCookie('CasbinSubject')}`);
console.log(`CasbinPolicies: ${getCookie('CasbinPolicies')}`);


// Users can set the handlers for different operations
handlers = {
    'read': ele => {ele.hidden = false}
}

// Casbin.js: Get the actions and objects from backend server (cookies)
policies = JSON.parse(getCookie('CasbinPolicies').slice(2));
console.log(policies);
// Handle all the actions on the objects
// {act1:[data1, data2], act2:[data3, data4]}
for (var act in policies) {
    for (var i = 0; i <  policies[act].length; ++i) {
        var obj = policies[act][i];
        var eles = document.getElementsByClassName(obj);
        for (var j = 0; j < eles.length; ++j) {
            handlers[act](eles[j]); // Handle all the target DOM elements with handlers.
        }
    }
}