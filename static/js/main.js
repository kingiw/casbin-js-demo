// Users can set the handlers for different operations
let handlers = {
    'deny': ele => {
        ele.style = "display:none"
    },
    'allow': ele => {ele.style = "display:true"}
}

let enforcer = new Enforcer(handlers);

let postsArray = [];
let globalUser = "Guest"; // Initial user


function userSwitch(user) {
    // Use casbin.js to fetch the user profiles
    getUserProfiles(user).then(res => {
        let profiles = res.data;

        // Call enforcer to update the profiles and page
        enforcer.updateProfiles(profiles);
        enforcer.updatePage();
        
        document.getElementById("user").innerHTML = user;
        globalUser = user;
    })
}

function createPost() {
    let post = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = `This posts is created by ${globalUser}`;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete"

    // Set the element to be specific object by assigning a class name to it 
    deleteBtn.classList.add(`${globalUser.toLowerCase()}_element`);
    deleteBtn.onclick = function() {
        console.log("How to delete myself?");
    }
    post.appendChild(p);
    post.appendChild(deleteBtn);
    document.getElementById("posts").appendChild(post);
}


window.onload = () => {

    // Casbin.js: Get the actions and objects from backend server (cookies)
    /*
    profiles = JSON.parse(getCookie('CasbinProfiles'));
    enforcer.updateProfiles(profiles);
    enforcer.updatePage();
    */

    // Or we can fetch the user profiles from the backend
    getUserProfiles(globalUser).then(res => {
        profiles = res.data;
        enforcer.updateProfiles(profiles);
        enforcer.updatePage();
    })
}



