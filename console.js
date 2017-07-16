

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

          var ref = firebase.database().ref().child('users');
//  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
              //console.log(snap.val());


          var object = snap.val();
          var email = object.email;
          var fullname = object.name;
          var joinDate = object.created_at;
          var roles = object.roles;
          console.log(roles);

          //var displayRole = roles.administrator;

          for (var prop in roles) {
              //console.log(roles[prop]);
                //document.getElementById("title").innerHTML= " ";
                if ((roles[prop]) === true)
               {
                console.log(prop);

                //$("#title").append("|"+prop+"|");
                //
                //$(document).ready(function(){

                    //});
                }
        };



          //Object.keys(roles).map((e)=>  console.log(`key=${e} value=${roles[e]}`));

          //console.log(joinDate);




          //console.log("Email is: "+ email);

          //console.log("This is the username:" + user.displayName);
            // document.getElementById("joinDate").innerHTML= joinDate;
            // document.getElementById("userName").innerHTML=fullname;


/*** View Machines ***/
          var ref = firebase.database().ref("machines");
          ref.orderByKey().endAt("machine2").on("child_added", function(snapshot) {
            console.log(snapshot.key);
          });

          });
          //console.log(user.displayName);

// JQUERY

//**Console Buttons **//
//**Update machines**


//**Print out all the machines


$(document).ready(function(){
console.log("Button1 was clicked");
    $("#btn1").click(function(){
      //clear contents
      $("#unList").html(" ");
      $("#editable").html(" ");
      //Title
      $("#querytitle").text("Machines");
      var queryDescrip= "Here is a list of current machines in operation."
      $("#querydescp").text(String(queryDescrip));
      var example = "this.is.a.string.";

      	var n = example.replace(/\./g,' ');
      var machineRef = firebase.database().ref().child("machines");
      machineRef.on("child_added", snap=> {
       $("#unList").append("<div id='editable'>" +


           "<li>"+snap.key.replace(/\_/g,' ').toUpperCase()+"</li>"

         +"</div>" );
        console.log(snap.key);
        });

    });

});

//SHOW users



$(document).ready(function(){
console.log("Button2 was clicked");
    $("#btn2").click(function(){
      //clear contents
      $("#unList").html(" ");
      $("#editable").html(" ");
      //Title
      $("#querytitle").text("Users");
      var queryDescrip= "Here is a list of users in operation."
      $("#querydescp").text(String(queryDescrip));

      var userRef = firebase.database().ref().child("users");
      userRef.on("value", snap=> {
       $("#unList").append("<div id='editable'>" +


           "<li>"+snap.val()+"</li>"

         +"</div>" );
        console.log(snap.key);
        });

    });

});



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
