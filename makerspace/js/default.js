

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

    //get elements
    const logout = document.getElementById('logout');

    firebase.auth().onAuthStateChanged(function(user) {
        //var userId = user.uid;

        if (user) {



          // User is signed in.

          var user = firebase.auth().currentUser;











          <!-- Log out-->
          logout.addEventListener('click', e => {
              console.log(name+"is signing out.");
              firebase.auth().signOut();

          });

        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });










}());
