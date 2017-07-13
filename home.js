

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
    const logout = document.getElementById('logout');
    const userPic = document.getElementById('userPic');
    const userName = document.getElementById('userName');
    const joinDate = document.getElementById('joinDate');
    const date = document.getElementById('date');
    const title = document.getElementById('title');
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

          // user.providerData.forEach(function (profile){
          //   console.log("Sign-in provider: "+profile.providerId);
          //   console.log("  Provider-specific UID: "+profile.uid);
          //   console.log("  Name: "+profile.displayName);
          //   console.log("  Email: "+profile.email);
          //   console.log("  Photo URL: "+profile.photoURL);
          //   });




           var ref = firebase.database().ref().child('users')
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
          var email = object.email;
          var fullname = object.name;
          var joinDate = object.created_at;
          var roles = object.roles;
          console.log(roles);

          var displayRole = roles.administrator;

          for (var prop in roles) {
              //console.log(roles[prop]);
                //document.getElementById("title").innerHTML= " ";
                if ((roles[prop]) === true)
               {
                console.log(prop);

                $("#title").append("|"+prop+"|");
                //
                $(document).ready(function(){

                    });
                }
        };

          //Object.keys(roles).map((e)=>  console.log(`key=${e} value=${roles[e]}`));

          console.log(joinDate);




          console.log("Email is: "+ email);

          //console.log("This is the username:" + user.displayName);
            document.getElementById("joinDate").innerHTML= joinDate;
            document.getElementById("userName").innerHTML=fullname;



          });
          //console.log(user.displayName);


        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'index.html';
        }
      });




    <!-- Log out-->
    logout.addEventListener('click', e => {
        console.log(name+"is signing out.");
        firebase.auth().signOut();

    });

// //Display image
// $(window).scroll(function() {
//   if ($(this).scrollTop()>200) {
//       $('#profileDisplay').fadeIn();
//   };
//   elseif ($(this).scrollTop()<500) {
//       $('#profileDisplay').fadeIn();
//   } else {
//       $('#profileDisplay').fadeOut();
//   }
// });
//



}());
