function firebaseInit(){

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


}

function checkifAdmin (){
  firebaseInit();
  var adminAccess = false;
  var ref = firebase.database().ref().child('users');
  ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
      //console.log(snap.val());
  var object = snap.val();
  var roles = object.roles;
  //console.log(roles);
  //var displayRole = roles.administrator;
  for (var prop in roles) {
      //console.log(roles[prop]);

        if ((roles[prop]) === true)
       {
         if(prop == "administrator"||"superuser"){
           adminAccess = true;
           console.log("Admin Approved");
           //$("#admin" ).remove();
           //$("#admin" ).remove();
        }
        if (adminAccess == true){
          console.log("Admin Approved");
          $("#admin" ).remove();
        }
      }
    };
  });


}

(function() {

    firebaseInit();
    //checkifAdmin();

    //get elements
    const logout = document.getElementById('logout');
    const userPic = document.getElementById('userPic');
    const userName = document.getElementById('userName');
    const joinDate = document.getElementById('joinDate');
    const date = document.getElementById('date');
    const title = document.getElementById('title');
    const adminConsole = document.getElementById("admin");
    // const profileDisplay = document.getElementById("profileDisplay");

    firebase.auth().onAuthStateChanged(function(user) {
        //var userId = user.uid;

        if (user) {



          // User is signed in.

          var user = firebase.auth().currentUser;

          //
          // user.updateProfile({
          //   displayName: "Robert Mwaniki",
          //   photoURL: "https://example.com/jane-q-user/profile.jpg"
          // }).then(function() {
          //   // Update successful.
          // }, function(error) {
          //     // An error happened.
          // });

          //profile picture
          $("#userPic").append(user.profile_picture);
          user.providerData.forEach(function (profile){
            console.log(profile);

            //UPDATE USER INFORMATION FOR FIRST TIME LOGINS
              if(profile.displayName == null){

                var signupQueue = firebase.database().ref().child('signupQueue');
                var userRef = firebase.database().ref('users/'+ user.uid);
                var userTemp;
                signupQueue.orderByChild('email').equalTo(profile.email).on("child_added", function (snap){
                  userTemp = snap.val();
                  //update user node
                  userRef.update(userTemp);

                  //update auth user
                  user.updateProfile({
                    displayName: userTemp.name,
                    photoURL: userTemp.profile_picture,
                  }).then(function() {
                    // Update successful.
                  }, function(error) {
                      // An error happened.
                  });

              });

              //ONCE DONE, CLEAN UP PAYLOAD

              signupQueue.orderByChild('email').equalTo(profile.email).on("child_added", function (snap){
                  var userRef = snap.ref;
                  return userRef.remove();
                });


            }else{
              console.log('Display name is valid');


            console.log("Sign-in provider: "+profile.providerId);
            console.log("  Provider-specific UID: "+profile.uid);
            console.log("  Name: "+profile.displayName);
            console.log("  Email: "+profile.email);
            console.log("  Photo URL: "+profile.photoURL);
}
            });




           var ref = firebase.database().ref().child('users');
          //     .orderByChild('email')
          //     .equalTo(userId)
          //     .on('child_added', function(data){
          //         console.log('accounts matching email address', data.val());
          //     });

          // var username = ref.name;


          //
          // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          //   var username = snapshot.val().username;
          //   // ...
          // });
//  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
              //console.log(snap.val());


          var object = snap.val();
          console.log("uid", object.uid);
          var email = object.email;
          var fullname = object.name;
          var joinDate = object.created_at;
          var roles = object.roles;
          var major = object.major_class;
          var year = object.year_class;
          //console.log(roles);

          var displayRole = roles.administrator;
          var adminAccess = false;
          for (var prop in roles) {
              //console.log(roles[prop]);
                //document.getElementById("title").innerHTML= " ";
                if ((roles[prop]) === true)
               {
                 if(prop == "administrator"||"superuser"){
                   adminAccess = true;
                   //console.log("Admin Approved");

                   //adminConsole.classList.add("hide");
                   $("#admin").show();
                 console.log(prop);
                }
                $("#title").append("|"+prop+"|");
                //

              }
        };


          console.log(joinDate);




          console.log("Email is: "+ email);

          //console.log("This is the username:" + user.displayName);
            document.getElementById("joinDate").innerHTML= joinDate;
            document.getElementById("userName").innerHTML=fullname;

            $("#major").append(major + " | " + "<b style='color:blue'>"+year+"</b>" );


          });
          //console.log(user.displayName);

          <!-- Log out-->
          logout.addEventListener('click', e => {
              console.log(name+"is signing out.");
              firebase.auth().signOut();

          });

        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'index.html';
        }
      });










}());
