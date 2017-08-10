
//if admin or super user display admin console
function checkifAdmin (userInput){
  //firebaseInit();
  var user = userInput;
  var adminAccess = false;
  var ref = firebase.database().ref().child('users');
  ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
      //console.log(snap.val());
  var object = snap.val();
  var roles = object.roles;
  //console.log(roles);
  //var displayRole = roles.administrator;
  for (var prop in roles) {
      console.log(prop, roles[prop]);

        if ((roles[prop]) === true )
       {

         switch(prop){
           case 'administrator':

             adminAccess = true;
             console.log("Admin Approved");
             $("#.hideme" ).remove();
             break;

           case 'superuser':

             adminAccess = true;
             console.log("SuperUser Approved");
             $("#admin" ).removeClass("hideme");
             break;
            default:
              adminAccess=false;
              $("#admin" ).remove();
         }


      }

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

    const logout = document.getElementById('logout');

    firebase.auth().onAuthStateChanged(function(user) {
        //var userId = user.uid;

        if (user) {
          checkifAdmin(user);


          // User is signed in.

          var user = firebase.auth().currentUser;











          <!-- Log out-->
          logout.addEventListener('click', e => {
              console.log(name+"is signing out.");
              firebase.auth().signOut();

          });

        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });










}());
