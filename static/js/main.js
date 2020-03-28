// Users can set the handlers for different operations
let handlers = {
    'allow': ele => {ele.hidden = false}
}

let enforcer = new Enforcer(handlers);
let postsArray = [];
let globalUser = "Guest"; // Initial user

function createPost() {
    // Insert a post to <div id="board">...</div>
    // A post should be 
    // <div>
    //     <p>post content</p>
    //     <button class="admin_data" onclick="deletePostfunc()">Delete</button>
    // </div>
    let post = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = `This post is created by ${globalUser} at ${new Date()}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete"
    // Set the element to be hidden by default
    deleteBtn.hidden = true;
    // Set the element to be specific object by assigning a class name to it
    // It means only those who have access to "admin_data" can see the element. 
    deleteBtn.classList.add(`admin_data`);

    // deletePostFunc()
    deleteBtn.onclick = function() {
        let post = this.parentNode;
        post.parentNode.removeChild(post);
    }
    post.appendChild(p);
    post.appendChild(deleteBtn);

    let board = document.getElementById("board");
    board.insertBefore(post, board.children[0]);
}

// When the user identity changes.
function userChange(user) {
    
    // Call casbin enforcer to update the page.
    enforcer.updatePage(user);
    // User customized the page status and DOM element;
    globalUser = user;
    document.getElementById("user").innerHTML = globalUser;
}

window.onload = () => {

    // Casbin.js: Get the actions and objects from (cookies)
    /*
    profiles = JSON.parse(getCookie('CasbinProfiles'));
    enforcer.updateProfiles(profiles);
    enforcer.updatePage();
    */

    // Or we can simply update the page with the current user identity
    enforcer.updatePage(globalUser);
}



