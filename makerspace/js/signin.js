
function writeUserData(date, email,name, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    created_at: date,
    email: email,
    name: name,
    profile_picture : imageUrl
  });
}

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
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnGoogleSignup = document.getElementById('btnGoogleSignUp');
    const txtFirstName = document.getElementById('txtFname');
    const txtLastName = document.getElementById('txtLname');
    const btnRegister = document.getElementById('btnRegister');

    var setup;

    btnLogin.addEventListener("click", e => {
        //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        //promise.catch(console.log(e.message));

        promise.catch(function(error){
          console.log('User login error', error.message);
          alert(error.message)
        });


    });

    //Add Register Event

    btnRegister.addEventListener('click', e =>{
      console.log("Register Button clicked");
      window.location= "signup.html";
    })
    //add sign up event




//add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

            console.log(firebaseUser+" has signed in.");
            if(firebaseUser.emailVerified==true){
              console.log("User has verified email.");


              var FunctionOne = function () {
                      var
                            a = $.Deferred(),
                            b = $.Deferred();

                          //remove email from unverified
                            firebase.database().ref().child('emails/unverified').orderByChild('email').equalTo(firebaseUser.email).on("value", function (snap){
                              var removeObject = snap.ref;
                              return removeObject.remove();
                              console.log('object was removed');
                            });
                          setTimeout(function () {
                            console.log('a done');
                            a.resolve();
                          },2500
                        );

                          // some other fake asyc task
                          //add email to verified list
                          var emailRef =firebase.database().ref('emails/verified/'+firebaseUser.uid).set({
                            "email": firebaseUser.email
                          });

                          setTimeout(function () {
                            console.log('b done');
                            b.resolve();
                          },2500);

                          return $.Deferred(function (def) {
                            $.when(a, b).done(function () {
                              def.resolve();
                            });
                          });
                        };
                        // define FunctionTwo as needed
                        var FunctionTwo = function () {

                          console.log('FunctionTwo');

                          window.location.href = 'profile.html';
                        };

                        // call FunctionOne and use the `done` method
                        // with `FunctionTwo` as it's parameter

                          console.log('check has began on '+ firebaseUser.email)//if null what happens?
                          var dRef = firebase.database().ref().child('disclaimer/'+firebaseUser.uid);
                              // if (dRef == null){
                              //       // if(snap.key == 'setup' &&snap.val() === true){
                              //       console.log('Ref not found.')
                              //       return false;
                              //     }
                          function checkForFirstTimeUser(){
                              firebase.database().ref().child('disclaimer/'+ firebaseUser.uid).on("child_added", function (snap){
                                console.log(snap.val());
                                console.log("setup Check: "+ snap.val());

                                if (snap.key == 'setup' && snap.val() === false){
                                  setup = false;
                                  console.log(snap.key, snap.val());
                                  console.log('You have not setup');
                                  return false;
                                }
                                else{
                                  return true;
                                }
                              });
                            }
                              setup = checkForFirstTimeUser();

                              if(setup == true){
                                console.log('The user has already been setup, redirecting to homepage...');
                                window.location.href='home.html';
                              }else{
                                //call setup functions
                                FunctionOne().done(FunctionTwo);
                              }
                              console.log('Set up is done');
                              alert();











//end of verified check
          }else{
            window.location.href= 'verified-check.html';
          }


      } else {
            console.log("not logged in");

        }
    });

    <!-- Function to logout-->




$(function() {
      $( ".input" ).each(function(){
          $(this).keyup(function(event){
               if(event.keyCode == 13){
                    $("#btnLogin").click();
                }
            });
        });
});


}());
