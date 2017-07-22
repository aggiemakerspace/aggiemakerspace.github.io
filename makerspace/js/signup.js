
function writeUserData(date, email,name, imageUrl) {

  //console.log(user);
  //send to signup queue
        // firebase.database().ref('signupQueue' + user.uid).set({
        firebase.database().ref('signupQueue').push({
          created_at: date,
          email: email,
          name: name,
          profile_picture : imageUrl,
          //maj_class: major,
          //year_class: year,
          maj_class: " ",
          year_class: " ",
          uid: " ",
          roles:
          {
            administrator: false,
            regularuser: true,
            superuser: false,
          }
        });


          //
          // firebase.user.updateProfile({
          //   displayName: name,
          //   photoURL: ""
          //
          // }).then(function(){
          //   console.log("Success name updated");
          // },function(error){
          //   console.log(error);
          // });



}

// function step(){
//
// var user = firebase.auth().currentUser;
// console.log(user);
// firebase.user.updateProfile({
//   displayName: fullname,
//   photoURL: ""
//
// }).then(function(){
//   console.log("Success name updated");
// },function(error){
//   console.log(error);
// });






//writeUserData(d,email,fullname, );


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
    const btnSignUp = document.getElementById('btnSignUp');
    //const btnLogout = document.getElementById('btnLogout');
    const txtFirstName = document.getElementById('txtFname');
    const txtLastName = document.getElementById('txtLname');
    // add login event
    // btnLogin.addEventListener("click", function () {
    //     //get email and pass
    //     const email = txtEmail.value;
    //     const pass = txtPassword.value;
    //     const auth = firebase.auth();
    //
    //     //sign in
    //     const promise = auth.signInWithEmailAndPassword(email, pass);
    //     //promise.catch(console.log(e.message));
    //     alert("Wrong Email or Password");
    //     //txtEmail = "ReEnter";
    //
    //     /*  promise.catch(console.log(message));*/
    // //AFTER SIGN IN
    //
    //     var user = firebase.auth().currentUser;
    //
    //     var name;
    //     if (user != null) {
    //         name = user.displayName;
    //
    //     };
    //
    //
    //
    //
    // });
//enter button pressed

$("#getInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#btnSignUp").click();
    }
});
    //add sign up event
    btnSignUp.addEventListener("click", e => {
        const fname = txtFirstName.value;
        const lname = txtLastName.value;
        const txtemail = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

//ifstatement
        var d = new Date();
        var n = d.toUTCString();

        var fullname = fname.concat(" ",lname);
        var imageUrl = "";
        //send to DB

        //sign up
        const promise = auth.createUserWithEmailAndPassword(txtemail, pass);
        promise.catch(function(error){
          console.log(error.message);
          alert(error.message)
        });


      //  setTimeout('', 4000);
      //  const login = auth.signInWithEmailAndPassword(txtemail, pass);
        // login.catch(function(error){
        //   console.log('User login error', error.message);
        //   alert(error.message)
        // });
        var today = new Date();
        var date = today.toString();

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          writeUserData(date, txtemail,fullname, imageUrl);

          setTimeout(function(){ alert('Success '+ txtemail+ ' was created');
          window.location= "signin.html";}, 1000);

          } else {
            // No user is signed in.

          }
        });




    });

          //   <!--Google Sign In -->
          // btnGoogleSignup.addEventListener('click', e =>{
          //     console.log("Google Sign in button was clicked");
          //     var provider = new firebase.auth.GoogleAuthProvider();
          //     provider.addScope('profile');
          //     provider.addScope('email');
          //
          //
          //     return firebase.auth().signInWithPopup(provider)
          //     .catch(function(error){
          //       console.log('Google sign in error', error);
          //     });
          //
          //
          // });




    // <!-- Log out-->
    // btnLogout.addEventListener('click', e => {
    //     firebase.auth().signOut();
    // });


//
// //add a realtime listener
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user);
//             //window.location.href = 'home.html';
//             btnLogOut.classList.remove('hide');
//         } else {
//             console.log("not logged in");
//             btnLogout.classList.add("hide");
//         }
//     });

    <!-- Function to logout-->




}());
