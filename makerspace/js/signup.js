
function setUpNode(uid){

    var dRef = firebase.database().ref().child('disclaimer/'+uid);

    dRef.set({
      'read': false,
      'date': " ",
      'setup': false
    });


}

function writeUserData(date, email,name, imageURL, id) {

  //console.log(user);
  //send to signup queue
        // firebase.database().ref('signupQueue' + user.uid).set({
        firebase.database().ref('signupQueue').push({
          created_at: date,
          email: email,
          name: name,
          profile_picture : 'avatar3.png',
          photoURL: imageURL,
          major_class: " ",
          year_class: " ",
          phone: " ",
          uid: id,
          roles:
          {
            administrator: false,
            regularuser: true,
            superuser: false,
          }
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
    const txtPassword = document.getElementById('txtPassword');
    const btnSignUp = document.getElementById('btnSignUp');
    //const btnLogout = document.getElementById('btnLogout');
    const txtFirstName = document.getElementById('txtFname');
    const txtLastName = document.getElementById('txtLname');
    const str = new String("The first name or last name is empty.");

$("#getInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#btnSignUp").click();
    }
});
    //add sign up event
    btnSignUp.addEventListener("click", e => {
        const fname = txtFirstName.value;
        const lname = txtLastName.value;

        if(fname.trim() == "" || lname.trim() == "" || fname.trim()==null|| lname.trim()==null){
            alert(str);
            window.location= "signup.html";
        }else{

            const pass = txtPassword.value;
            const auth = firebase.auth();
            var userEmail;
    //ifstatement
            var d = new Date();
            var n = d.toUTCString();

            var fullname = fname.concat(" ",lname);
            var imageURL= "https\://firebasestorage.googleapis.com";
            imageURL += "/v0/b/aggieplayground.appspot.com/";
            imageURL += "o/makerspace%2Fimages%2Favatar3.png?alt";
            imageURL += "media&token=305d76ac-e86b-4cec-9107-1a387d01ebde";

              //get inputted email

                var msInputNum =  $("#em-opt").val();
                console.log(msInputNum);
                var msInput="";

                switch(msInputNum){
                  case '0':
                    msInput = "aggies.ncat.edu";
                    break;
                  case '1':
                    msInput ="ncat.edu";
                    break
                  default:
                    break;
                };

                var eInput =  $("#txtEmail").val();
                console.log(eInput);
                if (eInput.includes('@')==false){

                  eInput+="@";
                }


                 userEmail = eInput+msInput;
                 console.log(userEmail);

            const promise = auth.createUserWithEmailAndPassword(userEmail, pass);
            promise.catch(function(error){
              console.log(error.message);
              alert(error.message)
            });

            var today = new Date();
            var date = today.toString();

            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {

                //send verification email
                user.sendEmailVerification().then(function() {
                  // Email sent.
                }).catch(function(error) {
                  // An error happened.
                });

              writeUserData(date, userEmail,fullname, imageURL, user.uid);

              //CREATE A DISCLAIMER AND SETUP NODE

              setUpNode(user.uid);
              //add user to email list

              var emailRef =firebase.database().ref('emails/unverified/'+user.uid).set({
                "email": user.email
              });

              setTimeout(function(){ alert('Success '+ userEmail+ ' was created');
              window.location= "signin.html";}, 1000);

              } else {
                // No user is signed in.

              }
            });

        };//else close

      });

    <!-- Function to logout-->




}());
