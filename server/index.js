const express = require('express');
const casbin = require('casbin');
const cookieParser = require('cookie-parser');


//https://stackoverflow.com/questions/51535455/express-js-use-async-function-on-requests
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

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

    console.log(await enforcer.getAllSubjects());
    console.log(await enforcer.getFilteredPolicy(0, 'alice')) // [ [ 'alice', 'data1', 'read' ] ]

    
    const app = express();
    const port = 3000;
    app.use(cookieParser());
    app.use(asyncMiddleware(async function (req, res, next) {
        var subject = req.cookies['CasbinSubject'];
        var policies;
        if (subject) {
            policies = await enforcer.getFilteredPolicy(0, subject)
            console.log(`${subject}: ${policies}`);
        } else {
            console.log("No related policies.")
        }
        res.cookie('CasbinPolicies', policies, {maxAge: 1000});
        next(); 
    }))
    app.use(express.static(__dirname + '/public'));

    app.get('/', (req, res) => {
        res.sendFile('index.html')
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    
})();