const express = require('express');
const casbin = require('casbin');
const cookieParser = require('cookie-parser');

(async () => {
    const enforcer = await casbin.newEnforcer('model.conf', 'policy.csv');
    
    const sub = 'alice'; // the user that wants to access a resource.
    const obj = 'data1'; // the resource that is going to be accessed.
    const act = 'read'; // the operation that the user performs on the resource.
    
    const res = await enforcer.enforce(sub, obj, act);
    if (res) {
      console.log(true);
    } else {
      console.log(false)
    }

    const app = express();
    const port = 3000;
    app.use(cookieParser());
    app.use(function (req, res, next) {
        var cookie = req.cookies.cookieName;
        if (cookie === undefined)
        {
            // no: set a new cookie
            var value = "TestCookieValue";
            res.cookie('TestCookieKey', value, { maxAge: 900000});
            console.log('cookie created successfully');
        } 
        else
        {
            // yes, cookie was already present 
            console.log('cookie exists', cookie);
        } 
        next(); 
    })
    app.use(express.static(__dirname + '/public'));



    app.get('/', (req, res) => {
        // var cookie = req.cookies.cookieName;
        // if (cookie === undefined)
        // {
        //     // no: set a new cookie
        //     var value = "TestCookieValue";
        //     res.cookie('TestCookieKey', value, { maxAge: 900000, httpOnly: true});
        //     console.log('cookie created successfully');
        // } 
        // else
        // {
        //     // yes, cookie was already present 
        //     console.log('cookie exists', cookie);
        // }
        res.render('index.html')
        // res.send('Hello World!');
    });
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();