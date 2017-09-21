function checkSU(userIn, task){
  //task use bool clockin: true clockout: false
  var user = userIn;
  var state = task;
  //get admins from database
  var  su =
  ['rgmwanik@aggies.ncat.edu',
   'alanier@aggies.ncat.edu',
   'pperry@aggies.ncat.edu',
   'smiric@aggies.ncat.edu',
   'mxross@aggies.ncat.edu',
   'agwaddel@aggies.ncat.edu',
   'cjgoldma@aggies.ncat.edu',
   'umnewkir@aggies.ncat.edu',
   'hmjupite@aggies.ncat.edu',
   'hvabulfa@aggies.ncat.edu',
   'tithurma@aggies.ncat.edu',
   'pkgrant@aggies.ncat.edu',
   'knbrown3@aggies.ncat.edu',
   'ttsurrat@aggies.ncat.edu',
   'gjormond@aggies.ncat.edu',
   'jck@ncat.edu']

//console.log(user.email+' pre check.');
  for( var prop in su){
    var emailC = su[prop];
    //console.log(su[prop])


   if(emailC=== user){
     console.log('comparing: ' +emailC+ ' with: '+ user)

     //state = true;

       switch(state){
         //clock in event
         case true:

         console.log("User is a su");
         var userInfo =
         {
           email: user,
           script: "<ul style='float:left'>  <img id='mcnair' src='img/avatar3.png' class='img-circle'  alt='Image' class='img-circle'"+
               "width='100' height='100'>" + user.name + "Clocked in</ul>"
         };
         //add to on duty node, delete
         firebase.database().ref('on_duty/').push(userInfo);

          break;

         case false:



          //on duty ref

          // var userRef = firebase.database().ref('on_duty').(
          //
          // userRef.orderByChild('email').equalTo(user).once("child_added", function (snap){
          //  var userRef = snap.ref;
          //
          //  console.log("User was removed");
          //  //$("#usrEmail").val("");
          //  return userRef.remove();
          //
          // });

          break;

         default:
          break;
       }
   }else{
      //sessionStorage.setItem("admin", false);

      //console.log("User is not an admin");

   }
}
}


function clockOutUser(userEmail){
  // User is signed in.
  var user = firebase.auth().currentUser;

  //Node references
  var ref = firebase.database().ref().child('users');
  //admin node reference
  //var userRef = firebase.database().ref('users/'+ user.uid);
  var timeRef = firebase.database().ref().child('timesheetQueue');
  var timeSheet = firebase.database().ref().child('timesheet');

  var timeOut = new Date();
  var date =  timeOut.toLocaleDateString('en-US');
  ref.orderByChild('email').equalTo(userEmail).once("value", function (snap){
    var userObject = snap.val();
//check if user exists
            if(snap.val() == null){
             alert(userEmail+" was not found. Try again");
            // $("#usrEmail").val("");
              console.log('CLOCK OUT EVENT: User not Found');
           }else{

              console.log('CLOCK OUT EVENT: User Found');
              //***CHECK IF SU EVENT
              // checkSU(userEmail,false);

              //CheckSU email and clock out event


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
                                tempUser.date = date;

                                //***Calculation

                                var ti = tempUser.timeIn;
                                var to = timeOut;
                                ti = Date.parse(ti);
                                to = Date.parse(to);

                                //duration
                                var diff = Math.abs(ti-to)/1000;

                                tempUser.duration = diff;

                                console.log('timein:'+ ti+'timeout:'+to)
                                console.log(diff);


                                //convert to minutes
                                var time = diff;
                                //s = 386547057;
                                var   s
                                    , m
                                    , seconds
                                    , h
                                    , minutes
                                    , days
                                    , hours;

                                s= diff;
                                  // Split s into minutes and seconds.
                                  m       = s / 60; // 6442450 minutes.
                                  seconds = s % 60; // 57 seconds.

                                  // Split m into hours and minutes.
                                  h       = m / 60; // 107374 hours.
                                  minutes = m % 60; // 10 minutes.

                                  // Split h into days and hours.
                                  days    = h / 24; // 4473 days.
                                  hours   = h % 24; // 22 hours.

                                var timeArray = [days,hours, minutes, seconds];
                                if(timeArray[0]<1){
                                  timeArray[0]=0;
                                }
                                for (var prop in timeArray){

                                  timeArray[prop]=Math.round(timeArray[prop]);
                                  console.log(timeArray[prop]);
                                }
                                var timeStamp = timeArray[1]+" Hours, "+timeArray[2]+" Minutes, "+timeArray[3]+" Seconds";

                                tempUser.duration_full = timeStamp;


                                //update timeout

                                //console.log('KEY OF TIMESHEET'+ key);
                                timeRef.child(tempUser.uid).update(tempUser);

                                timeSheet.child('count').transaction(function(i){
                                  return i -1;
                                });
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

}

//*** User Registration ***

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

    const btnSignUp = document.getElementById('btnQuickRegister');

    firebase.initializeApp(config);

    //const auth = firebase.auth();
    //remove
    // const logout = document.getElementById('logout');

    //
    // firebase.auth().onAuthStateChanged(function(user) {
  //admin or superuser has logged in
var timePass;
var storedPass = "1234";
//get timesheet passinput
$(function() {
    $(document).ready(function(){
      $( "#timeSheetPass").each(function(){
          $(this).keyup(function(event){
               if(event.keyCode == 13){
                 //get user inputted password
                 timePass = $("#timeSheetPass").val();

                    if(timePass==storedPass){
                      document.getElementById("overlay").style.display = "none";

                    }
                    else{
                      alert("Wrong password was entered");
                      $("#timeSheetPass").val("")
                    }
                }
            });
        });
});

});

        //Node references
        var ref = firebase.database().ref().child('users');
        //admin node reference
        //var userRef = firebase.database().ref('users/'+ user.uid);
        var timeRef = firebase.database().ref().child('timesheetQueue');
        var timeSheet = firebase.database().ref().child('timesheet');


        //****DISPLAY TIME
        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
            var d = new Date();
            var getDay = d.getDay();
            var state = "|";

            switch(getDay){
              case 0://Sunday

                      state+="<span style='color:red'>MS is Closed</span>";

                break;
              case 1://Monday
              var currentD = d;
                var openTime = new Date();
                openTime.setHours(10,00,0); // 5.30 pm
                var closeTime = new Date();
                closeTime.setHours(18,00,0); // 6.30 pm

                //console.log("happy hour?")
                if(currentD >= openTime && currentD < closeTime ){

                  state+="<span style='color:green'>MS is Open</span>"
                }else{
                      state+="<span style='color:red'>MS is Closed</span>";
                }
                break;
              case 2://Tuesday
              var currentD = d;
                var openTime = new Date();
                openTime.setHours(10,30,0); // 5.30 pm
                var closeTime = new Date();
                closeTime.setHours(18,30,0); // 6.30 pm

                //console.log("happy hour?")
                if(currentD >= openTime && currentD < closeTime ){

                  state+="<span style='color:green'>MS is Open</span>"
                }else{
                      state+="<span style='color:red'>MS is Closed</span>";
                }
                break;
              case 3://Wednesday
              var currentD = d;
                var openTime = new Date();
                openTime.setHours(10,00,0); // 5.30 pm
                var closeTime = new Date();
                closeTime.setHours(19,00,0); // 6.30 pm

                //console.log("happy hour?")
                if(currentD >= openTime && currentD < closeTime ){

                  state+="<span style='color:green'>MS is Open</span>"
                }else{
                      state+="<span style='color:red'>MS is Closed</span>";
                }
                break;
              case 4://Thursday
              var currentD = d;
                var openTime = new Date();
                openTime.setHours(10,00,0); // 5.30 pm
                var closeTime = new Date();
                closeTime.setHours(18,00,0); // 6.30 pm


                if(currentD >= openTime && currentD < closeTime ){

                  state+="<span style='color:green'>MS is Open</span>"
                }else{
                      state+="<span style='color:red'>MS is Closed</span>";
                }
                break;
              case 5://Friday
              var currentD = d;
                var openTime = new Date();
                openTime.setHours(10,00,0); // 5.30 pm
                var closeTime = new Date();
                closeTime.setHours(18,00,0); // 6.30 pm


                if(currentD >= openTime && currentD < closeTime ){

                  state+="<span style='color:green'>MS is Open</span>"
                }else{
                      state+="<span style='color:red'>MS is Closed</span>";
                }
                break;
              case 6://Saturday
                state+="<span style='color:red'>MS is Closed</span>";
                break;
              default:
                break;
            }

            document.getElementById("currentTime").innerHTML = d.toLocaleTimeString() + state;
        }


// ****DISPLAY CLOCK IN CLOCK OUT EVENTS
        //clockin event
         timeRef.on("child_added", function (snap){
           //update changes 07/01/17

             var tObj = snap.val();

             if(tObj.timeOut == " "){
               $("#editable").append(
               tObj.name+" has clocked in at "+tObj.timeIn +"\</ul><button onclick=\"clockOutUser('"+tObj.email+"')\"style='float:right'type='button' id="+
               "class='btn btn-success btn-lg btn-action'>Clock out</button>"+
               "<hr>");
             }
           });
            //clock out event
          timeRef.on("child_removed", function (snap){

            var tObj = snap.val();
            $("#editable").append("\<ul\>"+tObj.name+" has clocked out at "+tObj.timeOut +"\</ul><hr>");
          });



//*****UPDATE USER INFORMATION
  $(document).ready(function(){
                //user clocks in
                $("#btnClockin").click(function(){
                  console.log("------Button Clock in was clicked.")
                  //get email
                  var eInput =  $("#usrEmail").val().toLowerCase();

                  //console.log(eInput);
                  if (eInput.includes('@')==false){
                    eInput+="@";
                  }

                  //get inputted email
                    var timeIn = new Date();
                    var msInputNum =  $("#email-options").val();
                    //console.log(msInputNum);
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
                    console.log(userEmail)
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
//check to see if they are an admin
                                  // checkSU(userEmail);
                                  timeRef.orderByChild('email').equalTo(userEmail).once("value", function (snap){

                                            //user is not logged in
                                            if(snap.val() == null){
                                              //console.log("USER NOT LOGGED IN.");
                                              firebase.database().ref('timesheetQueue/'+userObject.uid).update({
                                                   email: userEmail,
                                                   date: " ",
                                                   uid: userObject.uid,
                                                   duration: " ",
                                                   duration_full: " ",
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

                                timeSheet.child('count').transaction(function (i){
                                  return i+1;
                                })
                                //reset user email
                                //$("#usrEmail").val("");
                              });
                              }
                            });//end of snap

                            //clear
                            $("#usrEmail").val('');

                  });//button clockin
  });//doc ready func

    $(document).ready(function(){
                  $("#btnClockout").click(function(){

                    console.log("-----Button Clock out was clicked.");
                    //get inputted email

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

                      var eInput =  $("#usrEmail").val().toLowerCase();

                      if (eInput.includes('@')==false){

                        eInput+="@";
                      }
                      var userEmail = eInput+msInput;

                      //GET USER CLOCKOUT INFORMATION

                      clockOutUser(userEmail);


                  });

        });//doc ready func








//********USER REGISTRATION **********



  btnSignUp.addEventListener("click", e => {
      var fname = $("#usrFName").val();
      var lname = $("#usrLName").val();

      if(fname.trim() == "" || lname.trim() == "" || fname.trim()==null|| lname.trim()==null){
          alert(str);
          window.location= "signup.html";
      }else{

          const pass = $("#usrPass").val();
          const auth = firebase.auth();
          var userEmail;
  //ifstatement
          var d = new Date();
          var n = d.toUTCString();

          var fullname = fname.concat(" ",lname);
          var imageURL= "https\://firebasestorage.googleapis.com";
          imageURL += "/v0/b/aggieplayground.appspot.com/";
          imageURL += "o/makerspace%2Fimages%2Favatar3.png?alt";
          imageURL += "media&token=305d76ac-e86b-4cec-9107-1a387d01ebde";

            //get inputted email

              var msInputNum =  $("#email-options_1").val();
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

              var eInput =  $("#usrEmailReg").val();
              console.log(eInput);
              if (eInput.includes('@')==false){

                eInput+="@";
              }


               userEmail = eInput+msInput;
               console.log(userEmail);

          const promise = auth.createUserWithEmailAndPassword(userEmail, pass);
          promise.catch(function(error){
            console.log(error.message);
            alert(error.message)
          });

          var today = new Date();
          var date = today.toString();

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

              //send verification email
              user.sendEmailVerification().then(function() {
                // Email sent.
              }).catch(function(error) {
                // An error happened.
              });

            writeUserData(date, userEmail,fullname, imageURL, user.uid);

            //CREATE A DISCLAIMER AND SETUP NODE

            setUpNode(user.uid);
            //add user to email list

            var emailRef =firebase.database().ref('emails/unverified/'+user.uid).set({
              "email": user.email
            });

            

            } else {
              // No user is signed in.

            }
          });

      };//else close


      //clear contents

      $("#usrFName").val("");
      $("#usrLName").val("");
      $("#usrPass").val("");
      $("#usrEmailReg").val("");


    });










}());//end of main function

function writeUserData(date, email,name, imageURL, id) {

  //console.log(user);
  //send to signup queue
        // firebase.database().ref('signupQueue' + user.uid).set({
        firebase.database().ref('signupQueue').push({
          created_at: date,
          email: email,
          name: name,
          profile_picture : 'avatar3.png',
          photoURL: imageURL,
          major_class: " ",
          year_class: " ",
          phone: " ",
          uid: id,
          roles:
          {
            administrator: false,
            regularuser: true,
            superuser: false,
          }
        });

}


function setUpNode(uid){

    var dRef = firebase.database().ref().child('disclaimer/'+uid);

    dRef.set({
      'read': false,
      'date': " ",
      'setup': false
    });


}
