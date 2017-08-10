
(function() {

    var provider = new firebase.auth.GoogleAuthProvider();
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

      //GET USER INFORMATION
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
            var img = $("#userPic");
            img.attr("src", img.attr("src").replace(img.attr("src"), currentPhotoURL));
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
              //
              //   console.log('file name is'+ file.name)
              //   var userRef = firebase.database().ref('users/'+ user.uid);
              //
              //   userRef.on("value", snap => {
              //   oldURL = snap.val().profile_picture;
              //   console.log(oldURL);
              //   // Delete existing Ref
              //   var deleteRef = firebase.storage().ref().child('makerspace/user_storage/'+user.email+'/profilePicture/'+oldURL);
              //     deleteRef.delete().then(function() {
              //       // File deleted successfully
              //       console.log('Success')
              //     }).catch(function(error) {
              //       // Uh-oh, an error occurred!
              //     });
              //
              // });
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


      } else
      {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = 'signin.html';
      }

  });

}());



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
