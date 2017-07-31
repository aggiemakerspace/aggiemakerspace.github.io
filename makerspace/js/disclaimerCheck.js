(function() {


  // var provider = new firebase.auth.GoogleAuthProvider();
  //
  // const config = {
  //     apiKey: "AIzaSyDusG6NBnTuNA8gamGCLlF-fagPO4ozJpk",
  //     authDomain: "aggieplayground.firebaseapp.com",
  //     databaseURL: "https://aggieplayground.firebaseio.com",
  //     projectId: "aggieplayground",
  //     storageBucket: "aggieplayground.appspot.com",
  //     messagingSenderId: "698274958365"
  // };
  //
  // firebase.initializeApp(config);
  //
  //


  firebase.auth().onAuthStateChanged(function(user){
    if (user){



        var user = firebase.auth().currentUser;

        function disclaimerCheck(){
        firebase.database().ref().child('disclaimer/'+ user.uid).on("child_added", function (snap){
          console.log("Disclaimer Check: "+ snap.val().read);
          if (snap.val().read == false){
            console.log('You have not read the disclaimer');
            window.location.href = 'disclaimer.html';

          }
          else{
            return true;
          }
        });

      }




  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = 'signin.html';
  }
});

}());
