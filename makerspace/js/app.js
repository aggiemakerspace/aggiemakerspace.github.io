/**
 * Created by user4734 on 6/26/2017.
 */
(function(){

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

    //get elements
    const preObject = document.getElementById('Object');
    const ulList = document.getElementById('list');


/*    //create references
    const dbRefObject = firebase.database().ref().child('object');
    const dbRefList =*/

            var database = firebase.database();
            var ref = database.ref('users');

            var =


//sync object changes
    dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(),null,3);

    });

    //sync list changes
    dbRefList.on('child_added', snap => console.log(snap.val()));



}());