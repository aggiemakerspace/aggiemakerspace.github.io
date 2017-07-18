
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
    //const btnLogout = document.getElementById('btnLogout');
    const btnGoogleSignup = document.getElementById('btnGoogleSignUp');
    const txtFirstName = document.getElementById('txtFname');
    const txtLastName = document.getElementById('txtLname');
    const btnRegister = document.getElementById('btnRegister');


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

        var user = firebase.auth().currentUser;
        console.log("User:"+String(user.uid));
        var name;
        if (user != null) {
            name = user.displayName;

        };


    });

    //Add Register Event

    btnRegister.addEventListener('click', e =>{
      console.log("Register Button clicked");
      window.location= "signup.html";
    })
    //add sign up event

        //Google Sign In
          btnGoogleSignup.addEventListener('click', e =>{
              //console.log("Google Sign in button was clicked");
              var provider = new firebase.auth.GoogleAuthProvider();
              provider.addScope('profile');
              provider.addScope('email');


              firebase.auth().signInWithRedirect(provider);

              firebase.auth().getRedirectResult().then(function(result) {
              if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
              }
              // The signed-in user info.
              var user = result.user;
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        });



    // <!-- Log out-->
    // btnLogout.addEventListener('click', e => {
    //     firebase.auth().signOut();
    // });



//add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser+" has signed in.");
            window.location.href = 'home.html';
            //btnLogout.classList.remove('hide');
        } else {
            console.log("not logged in");
            //btnLogout.classList.add("hide");
        }
    });

    <!-- Function to logout-->




}());
