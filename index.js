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

        // Get the subject(s)
        var subject = req.cookies['CasbinSubject'];

        // casbin service api: read all the actions and the correspoinding objects of a subject / subjects
        var policies;
        var cookieValue;
        if (subject) {
            policies = await enforcer.getFilteredPolicy(0, subject);
            // Convert the policies into another format
            // [alice,data1,read] => {"read":[data1]}
            // {act1:[data1, data2], act2:[data3, data4]}
            cookieValue = {};
            for (var i = 0; i < policies.length; ++i) {
                if (!(policies[i][2] in cookieValue)) {
                    cookieValue[policies[i][2]] = [];
                }
                cookieValue[policies[i][2]].push(policies[i][1]);
            }

            console.log(`${subject}: ${policies}`);
            console.log(`cookieValue: ${JSON.stringify(cookieValue)}`);
        } else {
            console.log("No related policies.")
        }

        // Output the result
        res.cookie('CasbinPolicies', cookieValue, {maxAge: 1000});
        next(); 
    }))
    app.use(express.static(__dirname + '/public'));

    app.get('/', (req, res) => {
        res.sendFile('index.html')
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    
})();