(function() {

    var provider = new firebase.auth.GoogleAuthProvider();
    var email_gl;
    var fullname_gl;
    var joinDate_gl;
    var roles_gl;
    var year_gl;
    var major_gl;

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

        console.log(user.uid)

      //GET USER INFORMATION
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
            var object = snap.val();
            console.log(object);
            console.log("uid", object.uid);
            var fullname = object.name;
            var year = object.year_class;
            var major = object.maj_class;

            //DISPLAY USER INFORMATION TO DOCUMENT
            $("#txtName").val(fullname);
            $("#year").val(year);
            ///Call Get Major function
            var val = getMajor(major);
              $("#major").val( val);
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
                    var nInput =  $("#txtName").val();
                    //var joinDate = object.created_at;
                    //var roles = object.roles;
                    var yInput =  $("#year").val();

                    //UPDATE database
                    ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
                      var userTemp = snap.val();
                      userTemp.name = nInput;
                      userTemp.major_class = majorsList[majNum];
                      userTemp.year_class = yInput;

                     userRef.update(userTemp);

                      console.log(userTemp);
                    });

                });
            });

                  //console.log(user.displayName);

                  <!-- Log out-->
                  logout.addEventListener('click', e => {
                      console.log(name+"is signing out.");
                      firebase.auth().signOut();});

      } else
      {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = 'index.html';
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
