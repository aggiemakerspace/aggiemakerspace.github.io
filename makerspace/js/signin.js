
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

    $("#getInput").keyup(function(event){
        if(event.keyCode == 13){
            $("#btnLogin").click();
        }
    });
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
