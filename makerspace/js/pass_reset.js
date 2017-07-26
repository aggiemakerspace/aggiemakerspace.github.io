
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





        $(document).ready(function(){

          $("#btnSubmit").click(function(){

          var emailAddress =$("#txtEmail").val();

          firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
            alert("A password reset email was sent to: "+emailAddress);
          }).catch(function(error) {
            // An error happened.
          });
        });
      });

}());
