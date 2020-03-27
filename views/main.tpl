<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script
    src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
    crossorigin="anonymous"></script>
    <script src="./static/js/casbin.js"></script>
    <script src="./static/js/main.js"></script>
</head>
<body>
    <h1>DEMO</h1>
    
    <div>
        <p>Now you are <span id="user">Guest</span></p>
        <p>Click the button to switch your account</p>
        <button onclick="userSwitch('Admin')">Admin</button>
        <button onclick="userSwitch('Alice')">Alice</button>
        <button onclick="userSwitch('Bob')">Bob</button>
        <button onclick="userSwitch('Guest')">Guest</button>
    </div>
    <div>
        <button onclick="createPost()">Create</button>
    </div>

    <h2>Posts</h2>
    <div id="posts"></div>
</body>
</html>

