
(function() {

    var provider = new firebase.auth.GoogleAuthProvider();
    //keep track of profile image load
    var oldURL;

    const config = {
        apiKey: "AIzaSyDusG6NBnTuNA8gamGCLlF-fagPO4ozJpk",
        authDomain: "aggieplayground.firebaseapp.com",
        databaseURL: "https://aggieplayground.firebaseio.com",
        projectId: "aggieplayground",
        storageBucket: "aggieplayground.appspot.com",
        messagingSenderId: "698274958365"
    };

    firebase.initializeApp(config);


    firebase.auth().onAuthStateChanged(function(user) {
    //var userId = user.uid;
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        //Node references
        var ref = firebase.database().ref().child('users');
        var userRef = firebase.database().ref('users/'+ user.uid);

        console.log(user)



          var FunctionOne = function () {
          // create a deferred object
          var r = $.Deferred();

          checkIfSetUp(user);
          setTimeout(function () {
            // and call `resolve` on the deferred object, once you're done
            r.resolve();
          }, 2500);

          // return the deferred object
          return r;
        };



        var FunctionTwo = function () {
          //get user info
          userInfo();
          console.log('FunctionTwo');
        };

        // call FunctionOne and use the `done` method
        // with `FunctionTwo` as it's parameter
        FunctionOne().done(FunctionTwo);

      //GET USER INFORMATION

      function userInfo(){
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
            var object = snap.val();
            console.log(object);
            console.log("uid", object.uid);
            var displayPicture = object.displayPicture;
            var fullname = object.name;
            //var email = object.email;
            var year = object.year_class;
            var major = object.major_class;
            var phoneText = object.phone;
            var currentPhotoURL = user.photoURL;
            console.log(phoneText)
            //DISPLAY USER INFORMATION TO DOCUMENT
            //profile picture
                    if(user.photoURL !== null){
                      var img = $("#userPic");
                      img.attr("src", img.attr("src").replace("assets/img/avatar3.png", user.photoURL));
                  }
            //img.attr("src", img.attr("src").replace(img.attr("src"), currentPhotoURL));
            $("#txtName").append(fullname);
            $("#year").val(year);
            $("#phoneNum").val(phoneText);
            ///Call Get Major function
            var val = getMajor(major);
              $("#major").val( val);

            });
            //UPLOAD profile_picture

              $(document).ready(function(){
                $("#file-upload").on("change", function(event){
                  file = event.target.files[0];
                  console.log(file.name);

                  uploadFile(file);
                });

                function uploadFile(){

                  var storageRef = firebase.storage().ref().child('makerspace/user_storage/'+user.email+'/profilePicture/'+file.name);
                  var uploadTask = storageRef.put(file);


                  uploadTask.on('state_changed', function(snap){
                  },function(error){

                  },function () {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(downloadURL);
                    var img = $("#userPic");
                    img.attr("src", img.attr("src").replace(img.attr("src"), downloadURL));

                    //update firebase user node

                    userRef.update({
                      profile_picture: file.name,
                      photoURL: downloadURL
                    });

                      //update display picture
                      user.updateProfile({
                        photoURL: downloadURL,
                      }).then(function() {
                        // Update successful.
                      }, function(error) {
                          // An error happened.
                      });

                  });

              }

            });

            //UPDATE USER INFORMATION
            $(document).ready(function(){

                $("#btnSubmit").click(function(){
                    console.log("submit button was clicked");
                    var majNum =   $("#major").val();
                    var majorsList =
                      [
                      " ","Biological Engineering", "Chemical Engineering", "Bioengineering",
                      "Biological Engineering", "Architectural Engineering", "Civil Engineering",
                      "Computer Science", "Computer Engineering", "Electrical Engineering",
                      "Industrial and Systems Engineering", "Mechanical Engineering", "Other"
                      ];


                    //var emailInput = object.email;

                    //var joinDate = object.created_at;
                    //var roles = object.roles;
                    var yInput =  $("#year").val();
                    //phone number
                    var pInput = $("#phoneNum").val();

                    //UPDATE database
                    ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
                      var userTemp = snap.val();

                      userTemp.major_class = majorsList[majNum];
                      userTemp.year_class = yInput;
                      userTemp.phone = pInput;

                     userRef.update(userTemp);

                     setTimeout(function(){ alert('Success your profile was updated. ');
                     window.location= "home.html";}, 500);
                      console.log(userTemp);
                    });

                    //delete old picture

                });
            });

                  //console.log(user.displayName);


      }
    } else
      {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = 'signin.html';
      }


  });

}());//firebase close





//***DOM****//
function getMajor(major){

  switch (major) {
      case 'Biological Engineering':
        return 1;
        break;
      case 'Chemical Engineering':
        return 2;
        break;
      case 'Bioengineering':
        return 3;
        break;
      case 'Biological Engineering':
        return 4;
        break;
      case 'Architectural Engineering':
        return 5;
        break;
      case 'Civil Engineering':
        return 6;
        break;
      case 'Computer Science':
        return 7;
        break;
      case 'Computer Engineering':
        return 8;
        break;
      case 'Electrical Engineering':
        return 9;
        break;
      case 'Industrial and Systems Engineering':
        return 10;
        break;
      case 'Mechanical Engineering':
        return 11;
        break;
      default:
        return 12;
    }
  };


//***** FINISH SIGNUP PROCESS *******
/*============FUNCTIONS ==============*/


//Remove user object from signinQueue, then add object to user object

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


//set up empty nodes
function setup (userInput){
  console.log("...Setting up user");
  var user= userInput;
  try{




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

  console.log('check has began on '+ user.email)//if null what happens?
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
