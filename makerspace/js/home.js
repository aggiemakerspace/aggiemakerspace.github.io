
function disclaimerCheck(){
firebase.database().ref().child('disclaimer/'+ user.uid).on("child_added", function (snap){
  console.log("Disclaimer Check: "+ snap.val().read);
  if (snap.val().read == false){
    console.log('You have not read the disclaimer');
    window.location.href = 'disclaimer.html';

  }
  else{
    return true;
  }
});

}






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
  //profile picture
          $("#userPic").append(user.profile_picture);
          user.providerData.forEach(function (profile){
            //console.log(profile);

            //UPDATE USER INFORMATION FOR FIRST TIME LOGINS
              if(profile.displayName == null){

                var signupQueue = firebase.database().ref().child('signupQueue');
                var userRef = firebase.database().ref('users/'+ user.uid);
                var userTemp;
                signupQueue.orderByChild('email').equalTo(profile.email).on("child_added", function (snap){
                  userTemp = snap.val();
                  userTemp.uid = user.uid;
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

                //CREATE CHECKOUT ITEMS NODE
                var checkOutRef = firebase.database().ref().child('checkOutItems/'+ user.uid);

                checkOutRef.child("item2").push({
                  dateIn: "",
                  dateOut: "",
                  item_descp: "",
                  item_name: ""

                });


                //CREATE A MACHINE MACHINE_APPROVAL NODE
                var mARef = firebase.database().ref().child('machine_approval/'+user.uid);

                mARef.set({
                  "3d_printer": false,
                  "boss_laser_engraver": false,
                  "cnc_milling_machine": false,
                  "other_mill": false,
                  "safety": false
                });
                //CREATE DISCLAIMER NODE

                var dRef = firebase.database().ref().child('disclaimer/'+user.uid);

                dRef.set({
                  'read': false,
                  'date': " "
                });
              //ONCE DONE, CLEAN UP PAYLOAD

              signupQueue.orderByChild('email').equalTo(profile.email).on("child_added", function (snap){
                  var userRef = snap.ref;
                  return userRef.remove();
                });


            }else{
              //console.log('Display name is valid');

              //do a disclaimer check
              disclaimerCheck();
            // console.log("Sign-in provider: "+profile.providerId);
            // console.log("  Provider-specific UID: "+profile.uid);
            // console.log("  Name: "+profile.displayName);
            // console.log("  Email: "+profile.email);
            // console.log("  Photo URL: "+profile.photoURL);
}
            });




           var ref = firebase.database().ref().child('users');

//  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){


          var object = snap.val();
          //console.log("uid", object.uid);
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

                if ((roles[prop]) === true)
               {
                 if(prop == "administrator"||"superuser"){
                   adminAccess = true;
                   //console.log("Admin Approved");

                   //adminConsole.classList.add("hide");
                   $("#admin").show();
                 console.log(prop);
                }
                $("#title").append("<h4>"+prop+"</h4>");
                //

              }
        };


          //console.log(joinDate);




          //console.log("Email is: "+ email);
//DISPLAY USER INFORMATIOn
          //console.log("This is the username:" + user.displayName);
            document.getElementById("joinDate").innerHTML= joinDate;
            document.getElementById("userName").innerHTML=fullname;

            $("#major").append("<h4>"+major +"</h4>" + "<h5 style='color:blue'>"+year+"</h5>" );


          });

//DISPLAY MACHINE APPROVAL

              var imageScript = "";
              var mApprRef  = firebase.database().ref().child('machine_approval/'+user.uid);
              mApprRef.on("child_added", snap=> {
                console.log(snap.val());
                switch(snap.val()) {
              case true:
                  imageScript = "<img style=\"margin-left:10px\" class= 'text-center' height=\"42\" width=\"42\" src='assets/img/machines/gold_cert.png' style=\"\" alt='Working' \>";
                  break;

              case false:
                  imageScript = "<img style=\"margin-left:10px\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/gray_cert.png' style=\"\" alt='Working' \>";
                  break;

              default:
                  break;

                }
                //console.log(snap.key, snap.val());
               $("#editable").append(


                   "<h4>"+snap.key.replace(/\_/g,' ').toUpperCase()
                   +imageScript+"</h4>"

                  );
                //console.log(snap.key);
                });
          //
          // <!-- Log out-->
          // logout.addEventListener('click', e => {
          //     console.log(name+"is signing out.");
          //     firebase.auth().signOut();
          //
          // });

//DISPLAY MACHINE STATUS


    var machineRef = firebase.database().ref().child("machines");
    var imageScript = " ";
    machineRef.on("child_added", snap=> {
      switch(snap.val().status) {
    case 'working':
        imageScript = "\<img class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/working.png' style=\"\" alt='Working' \>";
        break;
    case 'repair':
        imageScript = "\<img class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/repair.png' style=\"\" alt='Repair' \>";
        break;
    default:
        imageScript = "\<img class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/damaged.png' style=\"\" alt='Damaged' \>";

      }

     $("#editable2").append("<p> " +
         snap.key.replace(/\_/g,' ').toUpperCase()+" | "+snap.val().location+
         imageScript+
       "</p>" );
      console.log(snap.key);
      });



        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });










}());
