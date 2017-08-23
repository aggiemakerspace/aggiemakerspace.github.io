//console for superusers


function getInfo(input){

        var email = input;
         firebase.database().ref().child('users').orderByChild('email').equalTo(input).on('child_added',function (snap){




                 var
                  email,
                  name,
                  major,
                  phone,
                  year,
                  picURL;


                  email = snap.val().email;
                  name = snap.val().name;
                  major = snap.val().major_class;
                  phone = snap.val().phone;
                  year = snap.val().year_class;
                  picURL = snap.val().photoURL;

  // Title 1,2,3,4,5 #t1, #t2,#t3,#t4,#t5
                  //set titles
                  $("#t1").html('Name');
                    $("#t2").html('Email');
                      $("#t3").html('Major');
                        $("#t4").html('Classification');
                          $("#t5").html('Phone');

                  $("#editable").append(
                  "<tr ><td><img id=\"userPic\" src='"+ picURL +"' class='img-circle center-block img-responsive'"+
                  "style='height:100px;width:100px;margin-top: 10px;' alt='' "+

                  "<td style=''><h3>"+ name + "</h3></td><td style=''><h3>" +email+ "</h3></td><td style=''><h3>" + major+
                          "</h3></td><td><h3>" + year + "</h3></td><td><h3>" + phone + "</h3></td>/tr><br><hr>"

                        );

                   });

}
//show all users and their information
function displayUserInfo(){

    $("#editable").text(" ");
    var emailRef =  ref = firebase.database().ref().child('emails/verified');

     emailRef.orderByChild('email').on("child_added", function (snap){
       var userRef = snap.val();
       console.log(userRef.email);
       var email = userRef.email;
       getInfo(email);
          });


}

function displaySuperUsers (){

  //CONTAINER 1
    $("#editable").text(" ");

            //DISPLAY ALL superusers  //clockin event
              var superUsers = firebase.database().ref().child('roles/superusers');
               superUsers.on("child_added", function (snap){

                   var email = snap.val().email;
                   getInfo(email);
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



    firebase.auth().onAuthStateChanged(function(user) {



        if (user) {
          checkifAdmin(user);

          // GET SIGNED IN USER INFORMATION

          var user = firebase.auth().currentUser;
          var ref = firebase.database().ref().child('users');
          //  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          var usrObject = snap.val();
          });

          $(document).ready(function(){
                  // //SHOW machines
                  // $("#btn1").click(function(){
                  //
                  //
                  //
                  // });



                $("#btn2").click(function(){
                    //display user info
                    console.log('btn 2 was clicked');

                   $("#container").removeClass("hide");
                    displayUserInfo ();
                });

                $("#btn3").click(function(){
                  $("#container").removeClass("hide");
                   displaySuperUsers();

                 });



            });







        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });


}());

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
           case 'admin':

             adminAccess = true;
             console.log("Admin Approved");
             $("#btnAdmin" ).removeClass("config-hideme");
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
