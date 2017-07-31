
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

    const auth = firebase.auth();
    const logout = document.getElementById('logout');


    firebase.auth().onAuthStateChanged(function(user) {
  //admin or superuser has logged in
      if (user) {




        // User is signed in.
        var user = firebase.auth().currentUser;


        //Node references
        var ref = firebase.database().ref().child('users');
        //admin node reference
        var userRef = firebase.database().ref('users/'+ user.uid);
        var timeRef = firebase.database().ref().child('timesheetQueue');
        var timeSheet = firebase.database().ref().child('timesheet');

// ****DISPLAY CLOCK IN CLOCK OUT EVENTS
        //clockin event
         timeRef.on("child_added", function (snap){
           //update changes 07/01/17
        //  var imageScript = "<img id=\"userPic\" src='makerspace/assets/img/avatar3.png'"+
        //          "class='img-circle center-block img-responsive' style='height:50px;width:50px'/>";
        // var btnClockOut =   <a id="btnClockOut" class="btn btn-danger" href="config.html"  checkAdmin();>
        //     <div class=""></span>CONFIG <span class="glyphicon glyphicon-cog"></div>
        //   </a>
             var tObj = snap.val();

             if(tObj.timeOut == " "){
               $("#editable").append(
               tObj.name+" has clocked in at "+tObj.timeIn +"\</ul><hr>");
             }
           });
            //clock out event
          timeRef.on("child_removed", function (snap){

            var tObj = snap.val();
            $("#editable").append("\<ul\>"+tObj.name+" has clocked out at "+tObj.timeOut +"\</ul><hr>");
          });

//******GET ADMIN INFORMATION
          ref.orderByChild('email').equalTo(user.email).once("child_added", function (snap){
            var object = snap.val();
            console.log(object);
            console.log("uid", object.uid);
            var fullname = object.name;
            var email= object.email;
            //display admin name
            $("#loggedIn").append("<b>"+fullname+"</b> is on Duty");
            //DISPLAY USER INFORMATION TO DOCUMENT
            $("#loggedIn").val(fullname + " is on Duty");
          });


//*****UPDATE USER INFORMATION
            $(document).ready(function(){
                //user clocks in
                $("#btnClockin").click(function(){
                  console.log("------Button Clock in was clicked.")
                  //get email
                  var eInput =  $("#usrEmail").val();

                  console.log(eInput);
                  if (eInput.includes('@')==false){
                    eInput+="@";
                  }

                  //get inputted email
                    var timeIn = new Date();
                    var msInputNum =  $("#email-options").val();
                    console.log(msInputNum);
                    var msInput="";

                    switch(msInputNum){
                      case '0':
                        msInput = "aggies.ncat.edu";
                        break;
                      case '1':
                        msInput ="ncat.edu";
                        break
                      default:
                        break;
                    };
                    var userEmail = eInput+msInput;
                    //GET USER CLOCKIN INFORMATION

                    //CHECK IF USER EXISTS
                    ref.orderByChild('email').equalTo(userEmail).once("value", function (snap){
                      var userObject = snap.val();

                              if(snap.val() == null){
                               alert(userEmail+" was not found. Try again");
                              // $("#usrEmail").val("");
                                console.log('USER NOT FOUND');
                             }else{

                                console.log('USER INFO CONFIRMED');
                                //GET USER INFO
                                ref.orderByChild('email').equalTo(userEmail).on("child_added", function (snap){
                                  var userObject = snap.val();
                                  timeIn = timeIn.toString();

                                  timeRef.orderByChild('email').equalTo(userEmail).once("value", function (snap){

                                            //user is not logged in
                                            if(snap.val() == null){
                                              //console.log("USER NOT LOGGED IN.");
                                              firebase.database().ref('timesheetQueue/'+userObject.uid).update({
                                                   email: userEmail,
                                                   uid: userObject.uid,
                                                   duration: " ",
                                                   timeOut:" ",
                                                   logged_in:"true",
                                                   timeIn:timeIn,
                                                   name: userObject.name

                                              });
                                                console.log("User "+ userObject.email+" was added");
                                            }
                                            else{
                                              alert("User already logged in");
                                              //window.location.reload();
                                            }

                                    });


                                //reset user email
                                //$("#usrEmail").val("");
                              });
                              }
                            });//end of snap


                  });//button clockin
  });//doc ready func

    $(document).ready(function(){
                  $("#btnClockout").click(function(){

                    console.log("-----Button Clock out was clicked.");
                    //get inputted email
                      var timeOut = new Date();
                      var msInputNum =  $("#email-options").val();

                      var msInput="";

                      switch(msInputNum){
                        case '0':
                          msInput = "aggies.ncat.edu";
                          break;
                        case '1':
                          msInput ="ncat.edu";
                          break
                        default:
                          break;
                      };

                      var eInput =  $("#usrEmail").val();

                      if (eInput.includes('@')==false){

                        eInput+="@";
                      }
                      var userEmail = eInput+msInput;

                      //GET USER CLOCKOUT INFORMATION


                      ref.orderByChild('email').equalTo(userEmail).once("value", function (snap){
                        var userObject = snap.val();
//check if user exists
                                if(snap.val() == null){
                                 alert(userEmail+" was not found. Try again");
                                // $("#usrEmail").val("");
                                  console.log('CLOCK OUT EVENT: User not Found');
                               }else{

                                  console.log('CLOCK OUT EVENT: User Found');
                                  ref.orderByChild('email').equalTo(userEmail).on("child_added", function (snap){

                                    var userObject = snap.val();
                                  //console.log(userObject);
                                    //timeSheetQueue Ref

                                     timeOut = timeOut.toString();

                      //check if user already logged in

                                    timeRef.orderByChild('email').equalTo(userEmail).once("value", function (snap){
                                              var temp= snap.val();
                                              console.log(snap.val());

                                              //user is not logged in
                                              if(snap.val() !== null){
                                                console.log("logged in");
                                                timeRef.orderByChild('email').equalTo(userEmail).once("child_added", function (snap){
                                                    var tempUser = snap.val();
                                                    tempUser.timeOut =timeOut;
                                                    tempUser.logged_in=false;
                                                    //update timeout
                                                    timeRef.child(tempUser.uid).update(tempUser);


                                                    firebase.database().ref('timesheet/'+tempUser.uid).push(tempUser);
                                                    console.log(userEmail+'was clocked out at'+ timeOut)

                                                      timeRef.orderByChild('email').equalTo(tempUser.email).once("child_added", function (snap){
                                                       var userRef = snap.ref;

                                                       console.log("User was removed");
                                                       //$("#usrEmail").val("");
                                                       return userRef.remove();

                                                      });
                                                  });
                                              }
                                              else{
                                                alert(userEmail+ "not logged in");
                                              }

                                      });




                                });
                                }
                              });//end of snap











                  });

        });//doc ready func



                  <!-- Log out-->
                  logout.addEventListener('click', e => {
                      console.log(name+"is signing out.");
                      firebase.auth().signOut();});

      } else
      {
      // No user is signed in.
      console.log("No user is signed in");
      window.location.href = '../index.html';
      }

  });

}());
