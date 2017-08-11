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





            // var provider = new firebase.auth.GoogleAuthProvider();
            // firebase.initializeApp(config);
                firebase.auth().onAuthStateChanged(function(user){
                  if (user){
                        var user = firebase.auth().currentUser;
                        if(user.emailVerified == true){
                          window.location.href='signin.html';
                        }
                        
                        $('#displayEmail').append("<b>"+user.email+"</b>");
                        //resend verification link
                        $(document).ready(function(){
                            $("#btnResend").click(function(){
                              console.log('Resend Button CLicked');


                              //send verification email
                              user.sendEmailVerification().then(function() {
                                // Email sent.
                              }).catch(function(error) {
                                // An error happened.
                              });


                              setTimeout(function(){ alert("We resent a verification email.");
                              firebase.auth().signOut();
                              window.location= "signin.html";}, 1000);


                            });


                          });




                          } else {
                            // No user is signed in.
                            console.log("No user is signed in");
                            window.location.href = 'signin.html';
                          }
                  });

}());
