/****SIGN UP PROCESS****/

function finishSignup(userInput){
        console.log("finishSignup()");
        var user = userInput;

        var signupQueue = firebase.database().ref().child('signupQueue');
        var userRef = firebase.database().ref('users/'+ user.uid);
        var userTemp;
        signupQueue.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          userTemp = snap.val();
          userTemp.uid = user.uid;
          console.log(userTemp);
          //update user node
          userRef.update(userTemp);
          console.log(userTemp.name);
          //update auth user
          user.updateProfile({
            displayName: userTemp.name,
            photoURL: userTemp.photoURL,
          }).then(function() {
            // Update successful.
          }, function(error) {
              // An error happened.
          });

        });
      //SET UP EMPTY NODES FOR NEW user
      setup(user);
      //ONCE DONE, CLEAN UP PAYLOAD

      signupQueue.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          var userRef = snap.ref;
          return userRef.remove();
        });

}

//check disclaimer node for true key
function disclaimerCheck(userInput){
var user = userInput;
firebase.database().ref().child('disclaimer/'+ user.uid).on("child_added", function (snap){
  console.log("Disclaimer Check: "+ snap.val().read);
  if (snap.val().read == false){
    console.log('You have not read the disclaimer');
    window.location.href = 'disclaimer.html';

  }
  else{
    console.log(user.email +" has signed the waiver.")
    return true;
  }
});

}


//set up empty nodes
function setup (userInput){
  console.log("...Setting up user");
  var user= userInput;
  try{


        // //CREATE CHECKOUT ITEMS NODE
        // var checkOutRef = firebase.database().ref().child('checkOutItems/'+ user.uid);
        //
        // checkOutRef.child("item2").push({
        //   dateIn: "",
        //   dateOut: "",
        //   item_descp: "",
        //   item_name: ""
        //
        // });


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
          'date': " ",
          'setup': true
        });
          //once completed
          return true;
      }
      catch(err){
          console.log(err);
          alert(err);
        }

}

function checkIfSetUp(val){
  var user = val;

  console.log('check has began on '+ user.uid)//if null what happens?

  var dRef = firebase.database().ref().child('disclaimer/'+user.uid);
      if (dRef == null){
            // if(snap.key == 'setup' &&snap.val() === true){
            console.log('Ref not found.')
            return false;
          }else{
            dRef.on("child_added", snap => {
              console.log(snap.key,snap.val())
            if(snap.key === 'setup' && snap.val()===false){

              console.log('Set up is false');
finishSignup(user);

}

          });

        }

}





//initialize firebase connection
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

//checks if admins or superuser
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

    firebaseInit();

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

  console.log('is user verified'+ user.emailVerified);
  if(user.emailVerified == false){
    window.location.href= 'verified-check.html';
  }
          //check if user is verified

          user.providerData.forEach(function (profile){
          });
          checkifAdmin(user);
    // User is signed in.

          var user = firebase.auth().currentUser;
          console.log('User data: ' + user.uid);
  //profile picture
          if(user.photoURL !== null || user.photoURL == " "){
            var img = $("#userPic");
            img.attr("src", img.attr("src").replace("assets/img/avatar3.png", user.photoURL));


        }else{
          $("#userPic").val("assets/img/avatar3.png")
        }


  //*************UPDATE USER INFORMATION FOR FIRST TIME LOGINS**********
            console.log('Before check'+ user.displayName);//displaying null
            console.log('User object: '+ user);
            //**********************

            checkIfSetUp(user);
              // console.log(value);
              //           if (checkIfSetup(user)== false){
              //             console.log("FinishSignUp Call")
              //             finishSignup(user);
          //}

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
//show whether superuser, regularuser or admin
                if ((roles[prop]) === true)
               {
                 if(prop == "administrator"||"superuser"){
                   adminAccess = true;
                   //console.log("Admin Approved");

                   //adminConsole.classList.add("hide");
                   //$("#admin").show();

                }
                $("#title").append("<h4>"+prop+"</h4>");
                //

              }
        };



//DISPLAY USER INFORMATION
          //console.log("This is the username:" + user.displayName);


            document.getElementById("joinDate").innerHTML= joinDate;
            document.getElementById("userName").innerHTML=fullname;

            $("#major").append("<h4>"+major +"</h4>" + "<h5 style='color:blue'>"+year+"</h5>" );


          });

//DISPLAY MACHINE APPROVAL

              var imageScript = "";
              var mApprRef  = firebase.database().ref().child('machine_approval/'+user.uid);
              mApprRef.on("child_added", snap=> {

                switch(snap.val()) {
              case true:
                  imageScript = "<img style=\"margin-left:10px;float:right\" class= 'text-center' height=\"42\" width=\"42\" src='assets/img/machines/gold_cert.png' style=\"\" alt='Working' \>";
                  break;

              case false:
                  imageScript = "<img style=\"margin-left:10px; float:right\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/gray_cert.png' style=\"\" alt='Working' \>";
                  break;

              default:
                  break;

                }
                //console.log(snap.key, snap.val());
               $("#editable").append(


                   "<h4>"+snap.key.replace(/\_/g,' ').toUpperCase()
                   +imageScript+"</h4><hr>"

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
        imageScript = "\<img style=\"margin-top: 0px;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/working.png' style=\"\" alt='Working' \>";
        break;
    case 'repair':
        imageScript = "\<img  style=\"margin-top:0;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/repair.png' style=\"\" alt='Repair' \>";
        break;
    default:
        imageScript = "\<img  style=\"margin-top:0;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='assets/img/machines/damaged.png' style=\"\" alt='Damaged' \>";

      }
//the name of each Machine
     $("#editable2").append("<h4> " +
         snap.key.replace(/\_/g,' ').toUpperCase()+" | "+"<br>"+snap.val().location+"<br>"+
         imageScript+
       "<hr></h4>" );

      });



        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });










}());
