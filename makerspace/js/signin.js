
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

    //if enter button is pressed

    // $("#getInput").keyup(function(event){
    //     if(event.keyCode == 13){
    //         $("#btnLogin").click();
    //     }
    // });
    // add login event
    btnLogin.addEventListener("click", e => {
        //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        //promise.catch(console.log(e.message));
        // promise.catch(console.log("message!!!!" + e.message));
        // alert(e.message);

        promise.catch(function(error){
          console.log('User login error', error.message);
          alert(error.message)
        });


        //alert("Wrong Email or Password");
        //txtEmail = "ReEnter";

        /*  promise.catch(console.log(message));*/
    //AFTER SIGN IN
        //
        // var user = firebase.auth().currentUser;
        // console.log("User:"+String(user.uid));
        // var name;
        // if (user != null) {
        //     name = user.displayName;
        //
        // };


    });

    //Add Register Event

    btnRegister.addEventListener('click', e =>{
      console.log("Register Button clicked");
      window.location= "signup.html";
    })
    //add sign up event




    // <!-- Log out-->
    // btnLogout.addEventListener('click', e => {
    //     firebase.auth().signOut();
    // });



//add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser+" has signed in.");
            if(firebaseUser.emailVerified==true){


                //remove email from unverified
                  firebase.database().ref().child('emails/unverified').orderByChild('email').equalTo(firebaseUser.email).on("value", function (snap){
                    var removeObject = snap.ref;
                    return removeObject.remove();
                    console.log('object was removed');

                  });

                  //add email to verified list
                  var emailRef =firebase.database().ref('emails/verified/'+firebaseUser.uid).set({
                    "email": firebaseUser.email
                  });
            // //open home screen
            // if(firebaseUser.displayName == null){
            //   window.location.href='profile.html';
            // }
            window.location.href = 'home.html';
          }
          else{
            window.location.href= 'verified-check.html';
          }
            //btnLogout.classList.remove('hide');
      } else {
            console.log("not logged in");
            //btnLogout.classList.add("hide");
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
