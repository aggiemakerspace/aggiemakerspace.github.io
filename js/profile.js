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


    firebase.auth().onAuthStateChanged(function(user) {
    //var userId = user.uid;
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref().child('users');


      //GET USER INFORMATION
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
            var object = snap.val();
            console.log("uid", object.uid);
            var email = object.email;
            var fullname = object.name;
            var joinDate = object.created_at;
            var roles = object.roles;
            //console.log(roles);

            var displayRole = roles.administrator;


            $("#txtName").text(fullname);

            //$("#name").append(fullname);

            });

          window.onload = function () {
          var JSON = {
              "COLUMNS":["ID", "Name"],
              "DATA": [
                  ["1","Biological Engineering"],
                  ["2", "Chemical Engineering"],
                  ["3", "Bioengineering"],
                  ["4", "Biological Engineering"],
                  ["5", "Architectural Engineering"],
                  ["6", "Civil Engineering"],
                  ["7", "Computer Science"],
                  ["8", "Computer Engineering"],
                  ["9", "Electrical Engineering"],
                  ["10", "Industrial and Systems Engineering"],
                  ["11", "Mechanical Engineering"],
                  ["12",  "Other"]
              ]
          }, select = document.getElementById("selector");
          for (var i = 0; i < JSON.DATA.length; i++) {
          var at = JSON.DATA[i], id = at[0], name = at[1];
              var option = document.createElement("option");
              option.value = id;
              option.textContent = name;
              select.appendChild(option);
          };
        };
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
