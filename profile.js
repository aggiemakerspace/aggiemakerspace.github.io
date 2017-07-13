(function() {

    var provider = new firebase.auth.GoogleAuthProvider();

    const config = {
        apiKey: "AIzaSyDusG6NBnTuNA8gamGCLlF-fagPO4ozJpk",
        authDomain: "aggieplayground.firebaseapp.com",
        databaseURL: "https://aggieplayground.firebaseio.com",
        projectId: "aggieplayground",
        storageBucket: "aggieplayground.appspot.com",
        messagingSenderId: "698274958365"
    };

    firebase.initializeApp(config);


    window.onload = function () {
    var JSON = {
        "COLUMNS":["ID", "Name"],
        "DATA": [
            ["1","Joe"],
            ["2", "Sam"],
            ["3", "Doug"]
        ]
    }, select = document.getElementById("selector");
    for (var i = 0; i < JSON.DATA.length; i++) {
    var at = JSON.DATA[i], id = at[0], name = at[1];
        var option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        select.appendChild(option);
    };
};


    }());
