function updateUserRole(roleChange){

  //  **Get User Info**
            var ref = firebase.database().ref().child('users');
            var date;
            var email;
            var major;
            var fullname;
            var phone;
            var profPic;
            var roles;
            var userid;
            var year;


            ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
                //console.log(snap.val());


            var object = snap.val();
            //
             date = object.created_at;
             email = object.email;
             major = object.major_class;
             fullname = object.name;
             phone = object.phone;
             profPic = object.profile_picture;
             roles = object.roles;
             userid = object.uid;
             year = object.year_class;
           });

            firebase.database().ref('users/'+object.uid).update({


                 created_at: date,
                 email: email,
                 major_class: major,
                 name: fullname,
                 phone: phone,
                 profile_picture: profPic,
                 roles: roleChange,
                 uid: userid,
                 year: year
            });

              firebase.database().ref('roles/superusers'+object.uid).update({

                email: email,
                name: fullname,
                phone: phone
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


    //get elements
    // const .... = document.getElementById('....');

    // const profileDisplay = document.getElementById("profileDisplay");

    firebase.auth().onAuthStateChanged(function(user) {

        //var userId = user.uid;

        if (user) {


          // GET SIGNED IN USER INFORMATION

          var user = firebase.auth().currentUser;
          var ref = firebase.database().ref().child('users');
          //  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          var usrObject = snap.val();
          });



          //DISPLAY ALL superusers  //clockin event
            var superUsers = firebase.database().ref().child('roles/superusers');
             superUsers.on("child_added", function (snap){

                 var sUObj = snap.val();


                   $("#editable1").append("\<ul\>"+

                   +sUObj.name +"\</ul>"
                   +"<ul>"+sUObj.email+"\<hr\>");

               });

               //DISPLAY ALL Machines
                 var machineRef = firebase.database().ref().child('machines');
                  machineRef.on("child_added", snap => {




                        $("#editable2").append("\<ul\>"+

                        snap.key.replace(/\_/g,' ').toUpperCase()+

                        +snap.val().status+ " "+
                        snap.val().location+ " " +
                        "<b>"+snap.val().id+ "\</b>"+

                        "\</ul>"+
                        "\<hr\>");

                    });

                    //DISPLAY MACHINE APPROVAL
                    var useremail
                    var username;
                    var machineObj;
                      var machineApprRef = firebase.database().ref().child('machine_approval');
                       machineApprRef.on("child_added", snap => {
                         machineObj=snap.val();
                         console.log(snap.key);
                         firebase.database().ref().child('users').orderByChild('uid').equalTo(snap.key).on("child_added", snap =>{
                           useremail = snap.val().email;
                           username = snap.val().name;
                           console.log()
                           console.log(useremail+ " "+username);


                           console.log(machineObj);

                             $("#editable3").append("\<ul\>"+
                             username+ " "+machineObj[0] +
                             useremail);



                                //   for (var i = 0; i < machineObj.length; i++) {
                                //     console.log(machineObj[i]);
                                 //
                                //      $("#editable3").append( machineObj[i] + machineObj[i].boss_laser_engraver +
                                //         machineObj[i].cnc_milling_machine +
                                //         machineObj[i].other_mill );
                                 //
                                //       };
                                 //
                                 //
                                //   $("#editable3").append("\<ul\>"+
                                 //
                                //  "\</ul>"+
                                //  "\<hr\>");


                            });
                          });







// JQUERY

//**Console Buttons **//
//**Update machines**


//**Print out all the machines


$(document).ready(function(){

    $("#btn1").click(function(){
      console.log("Button1 was clicked");
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

       $("#unList").append("<div id='editable'> " +
           "<li>"+snap.key.replace(/\_/g,' ').toUpperCase()+" "+snap.val().location+" "+imageScript+"</li>"
         +"</div>" );
        console.log(snap.key);
        });

    });

});

//SHOW users



$(document).ready(function(){

    $("#btn2").click(function(){
      //clear contents
      console.log("Button2 was clicked");
      $("#unList").html(" ");
      $("#editable1").html(" ");
      //Title
      $("#querytitle").text("Users");
      var queryDescrip= "Here is a list of users in operation."
      $("#querydescp").text(String(queryDescrip));

      var userRef = firebase.database().ref().child("users");
      userRef.on("child_added", snap=> {
       $("#unList").append("<div id='editable'>" +


           "<li>"+snap.val().email+" "+ snap.val().name+"  "+"</li>"

         +"</div>" );
        console.log(snap.key);
        });

    });

}),

//SHow all SuperUsers
$(document).ready(function(){

    $("#btn4").click(function(){
      console.log("Button4 was clicked");
      //clear contents
      $("#unList").html(" ");
      $("#editable").html(" ");
      //Title
      $("#querytitle").text("SuperUsers");
      var queryDescrip= "Here is a list of superusers in operation."
      $("#querydescp").text(String(queryDescrip));

      var rolesRef = firebase.database().ref('roles').child('admins').orderByChild('email');
      rolesRef.on("child_added", snap=> {
        var userRef = snap.val();
       $("#unList").append("<div id='editable'>"+"<li>"+"Name: "+ userRef.name + " Email: " + String(userRef.email) +
       " Phone:" +String(userRef.phone)+"</li>"
       +"<bd>"+"</div>" );
        console.log(snap.key);
        });

    });

});

//ADD administrators, superusers
$(document).ready(function(){

    $("#btnAdmin").click(function(){
      //clear contents
      console.log("Admin Button was clicked");
      $("#unList").html(" ");
      $("#editable").html(" ");
      //Title
      $("#querytitle").text("Users");
      var queryDescrip= "Amend users, and users rights."
      $("#querydescp").text(String(queryDescrip));

      var userRef = firebase.database().ref().child("superusers");
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
          window.location.href = 'signin.html';
        }
      });


}());
