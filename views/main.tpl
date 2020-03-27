<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div>Everyone can see this.</div>
    <!-- Set the class of the DOM elements controlled by casbin. -->
    <div class="data1" hidden>Data1: only Alice can see this.</div>
    <div class="data2" hidden onload="isAllowed()">Data2: only Bob can see this.</div>

    <button onclick="alice()">I am Alice</button>
    <button onclick="bob()">I am Bob</button>
    <button onclick="anonymous()">I am anonymous</button>
    <script src="./static/js/casbin.js"></script>
</body>
</html>
