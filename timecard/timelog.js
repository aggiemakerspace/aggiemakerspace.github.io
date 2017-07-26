
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


    //const promise = auth.signInWithEmailAndPassword('robertmwaniki@hotmail.com', 'jemmie');
    //promise.catch(console.log(e.message));
    // promise.catch(console.log("message!!!!" + e.message));
    // alert(e.message);

    // promise.catch(function(error){
    //   console.log('User login error', error.message);
    //   alert(error.message)
    // });


    firebase.auth().onAuthStateChanged(function(user) {
  //admin or superuser has logged in
      if (user) {


        var count=0;

        // User is signed in.
        var user = firebase.auth().currentUser;


        //Node references
        var ref = firebase.database().ref().child('users');
        var userRef = firebase.database().ref('users/'+ user.uid);
         var timeRef = firebase.database().ref().child('timesheetQueue');
         var timeSheet = firebase.database().ref().child('timesheet');
        //clockin
         timeRef.on("child_added", function (snap){

             var tObj = snap.val();


               $("#editable").append("\<li\>"+tObj.email+" has clocked in at "+tObj.timeIn +"\</li><hr>");
             });


             //clock out event
             timeSheet.on("child_added",function(snap){
               var tObj = snap.val();
               if(tObj.email !== null){
             $("#editable").append("\<li\>"+tObj.email+" has clocked out at "+tObj.timeOut +"\</li><hr>");
}
           });






        //var timeQRef = firebase.database().ref().child('timesheetQueue');
        //var timeSRef = firebase.database().ref().child('timesheet'+user_uid);


      //GET ADMIN INFORMATION
          ref.orderByChild('email').equalTo(user.email).once("child_added", function (snap){
            var object = snap.val();
            console.log(object);
            console.log("uid", object.uid);
            var fullname = object.name;
              //var year = object.year_class;
            //var major = object.major_class;
            var email= object.email;
            //display admin name
            $("#loggedIn").append("<b>"+fullname+"</b> is on Duty");

            //DISPLAY USER INFORMATION TO DOCUMENT
            $("#loggedIn").val(fullname + " is on Duty");


          });


            //UPDATE USER INFORMATION
            $(document).ready(function(){
                //user clocks in
                $("#btnClockin").click(function(){


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

                    var eInput =  $("#usrEmail").val();
                    console.log(eInput);
                    if (eInput.includes('@')==false){

                      eInput+="@";
                    }
                    var userEmail = eInput+msInput;

                    //GET USER CLOCKIN INFORMATION


                    ref.orderByChild('email').equalTo(userEmail).once("value", function (snap){
                      var userObject = snap.val();

                              if(snap.val() == null){
                               alert(userEmail+" was not found. Try again");
                               $("#usrEmail").val("");
                                console.log('false');
                             }else{

                                console.log('true');
                                ref.orderByChild('email').equalTo(userEmail).on("child_added", function (snap){

                                  var userObject = snap.val();
                                //console.log(userObject);
                                  //timeSheetQueue Ref

                                   timeIn = timeIn.toString();
                                  console.log(timeIn);
                                  console.log(userObject.email);
                                  //count = .userCount;
                                  //count++;
                    //check if user already logged in
                                  timeRef.orderByChild('email').equalTo(userEmail).once("value", function (snap){

                                            //user is not logged in
                                            if(snap.val() == null){
                                              console.log("false");
                                              firebase.database().ref('timesheetQueue').push({
                                                    email: userEmail,
                                                    uid: userObject.uid,
                                                   duration: " ",
                                                   timeOut:" ",
                                                   logged_in:"true",
                                                   timeIn:timeIn,
                                                   name: userObject.name

                                              });
                                            }
                                            else{
                                              alert("User already logged in");
                                            }

                                    });

                                  //DISPLAY TIME ON PAGE
                                  // $("#editable").append("\<li\>"+userEmail+" has clocked in at "+t.toString() +"\</li>");
                                  // alert(userEmail+" logged in successfully.");

                                //count++;
                                console.log("User "+ count+" was added");
                                $("#usrEmail").val("");
                              });
                              }
                            });//end of snap


                  });//button clockin

                  $("#btnClockout").click(function(){


                    //get inputted email
                      var timeOut = new Date();
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

                      var eInput =  $("#usrEmail").val();
                      console.log(eInput);
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
                                 $("#usrEmail").val("");
                                  console.log('false');
                               }else{

                                  console.log('true');
                                  ref.orderByChild('email').equalTo(userEmail).on("child_added", function (snap){

                                    var userObject = snap.val();
                                  //console.log(userObject);
                                    //timeSheetQueue Ref

                                     timeOut = timeOut.toString();
                                    console.log(timeOut);
                                    console.log(userObject.email);
                                    //count = .userCount;
                                    //count++;
                      //check if user already logged in

                                    timeRef.orderByChild('email').equalTo(userEmail).once("value", function (snap){
                                              var temp= snap.val();


                                              //user is not logged in
                                              if(snap.val() !== null){
                                                console.log("logged in");
                                                timeRef.orderByChild('email').equalTo(userEmail).once("child_added", function (snap){
                                                  var tempUser = snap.val();
                                                  tempUser.timeOut =timeOut;

                                                  timeRef.update(tempUser);
                                                  //remove Temp node

                                                  firebase.database().ref('timesheet/'+tempUser.uid).update(tempUser);
                                                  });

                                                  //remove node
                                                  timeRef.orderByChild('email').equalTo(userEmail).once('child_added',function(snap){

                                                    var tempUser=snap.val();
                                                    return tempUser.remove();
                                                  })



                                              }
                                              else{
                                                alert("User already  not logged in");
                                              }

                                      });

                                    //DISPLAY TIME ON PAGE
                                    // $("#editable").append("\<li\>"+userEmail+" has clocked in at "+t.toString() +"\</li>");
                                    // alert(userEmail+" logged in successfully.");

                                  //count++;
                                  console.log("User "+ count+" was removed");
                                  $("#usrEmail").val("");
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
