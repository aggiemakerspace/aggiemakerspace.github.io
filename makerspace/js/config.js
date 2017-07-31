function addTraining(){

  var emailInput = $("#trEmail").val();
  var status = $("#trStatus").val();

  var machineid = $("#tId").val();
  var machineid = machineid.trim().toLowerCase();

  var machineName ="";
  var usrId = "";


  function alertEmpty(){
    alert("Warning: some values are missing");
  }
  function checkEmpty(){

  return  emailInput && status && machineid;
    return true;
  }
//check if values are empty

checkEmpty() || alertEmpty();


        //get the machine name from given machine id
        firebase.database().ref().child('machines').on("child_added", snap => {
          if(snap.val().id == machineid){
            machineName = snap.key;
          }
        });

          //get the persons uid from email
            firebase.database().ref().child('users').orderByChild('email').equalTo(emailInput).on("child_added", function (snap){
                usrId = snap.val().uid;

            });

        console.log('Updating:'+machineName+usrId);
                var bool = status;
                //select which machine to update
                switch(machineName){
                  case 'other_mill':
                    firebase.database().ref().child('machine_approval/'+usrId).update({
                      other_mill: bool
                    });
                    break;

                  case '3d_printer':
                    firebase.database().ref().child('machine_approval/'+usrId).update({
                      '3d_printer': bool
                    });
                    break;

                  case 'boss_laser_engraver':
                    firebase.database().ref().child('machine_approval/'+usrId).update({
                      boss_laser_engraver: bool
                    });
                    break;
                  case 'cnc_milling_machine':
                    firebase.database().ref().child('machine_approval/'+usrId).update({
                      cnc_milling_machine: bool
                    });
                    break;

                  case 'safety':
                    firebase.database().ref().child('machine_approval/'+usrId).update({
                      safety: bool
                    });
                    break;
                }


        alert('Updated ' +emailInput+machineName);









}
function displayTraining(x, y){
    console.log("Button was clicked");

    //name = other_mill, safety
    var bool = x;
    var mName =y;
      var mARef = firebase.database().ref().child('machine_approval');

      function getUserInfo(val){
                var givenId = val;
                $("#editable3").text(" ");
                //get user information and display in panel-primary
                firebase.database().ref().child('users').orderByChild('uid').equalTo(givenId).on("child_added", snap => {
                  var userObj = snap.val()
                  $("#editable3").append("\<ul>"

                  +userObj.name +"\</ul>"
                  +"<ul>"+userObj.email+"\<hr\>");
                });
  }

          switch (mName){
            case 'other_mill':

                      // other mill\\
                      switch (bool){

                        case true:

                              mARef.on("child_added", snap => {

                                  if(snap.val().other_mill === true){
                                  console.log(snap.key,snap.val().other_mill);
                                    getUserInfo(snap.key);
                                  }
                                });
                                break;
                        case false:
                              mARef.on("child_added", snap => {
                                  if(snap.val().other_mill === false){
                                  console.log(snap.key,snap.val().other_mill);
                                    getUserInfo(snap.key);
                                  }
                              });
                          break;
                      }
              break;

          case '3d_printer':

                                // other mill\\
                                switch (bool){

                                  case true:
                                  //get user uid
                                  firebase.database().ref().child('users').on("child_added", snap => {
                                    var uid = snap.val().uid;

                                  //
                                  //    if (snap.val() == '3d_printer'){
                                  //    console.log(snap.key,snap.val());
                                  //    }
                                  //  });


                                        mARef.child(uid).on("child_added", snap => {
                                            if (snap.key == '3d_printer' && snap.val()===true){
                                            console.log(snap.key,snap.val());
                                              getUserInfo(uid);
                                            }
                                          });
                                    });
                                          break;
                                  case false:
                                        // mARef.on("child_added", snap => {
                                        //     if(snap.val().3d_printer === false){
                                        //     console.log(snap.key,snap.val().3d_printer);
                                        //       getUserInfo(snap.key);
                                        //     }
                                        // });
                                    break;
                                }

              break;

          case 'boss_laser_engraver':


                                // other mill\\
                                switch (bool){

                                  case true:

                                        mARef.on("child_added", snap => {

                                            if(snap.val().boss_laser_engraver === true){
                                            console.log(snap.key,snap.val().boss_laser_engraver);
                                              getUserInfo(snap.key);
                                            }
                                          });
                                          break;
                                  case false:
                                        mARef.on("child_added", snap => {
                                            if(snap.val().boss_laser_engraver === false){
                                            console.log(snap.key,snap.val().boss_laser_engraver);
                                              getUserInfo(snap.key);
                                            }
                                        });
                                    break;
                                }
              break;

          case 'cnc_milling_machine':


                                // other mill\\
                                switch (bool){

                                  case true:

                                        mARef.on("child_added", snap => {

                                            if(snap.val().cnc_milling_machine === true){
                                            console.log(snap.key,snap.val().cnc_milling_machine);
                                              getUserInfo(snap.key);
                                            }else{
                                              console.log("No users found for cnc milling machine training");

                                            }

                                          });
                                          break;
                                  case false:
                                        mARef.on("child_added", snap => {
                                            if(snap.val().cnc_milling_machine === false){
                                            console.log(snap.key,snap.val().cnc_milling_machine);
                                              getUserInfo(snap.key);
                                            }else{
                                              console.log("All users in Database have done training.")
                                            }
                                        });
                                    break;
                                }
              break;
          case 'safety':

                                // other mill\\
                                switch (bool){

                                  case true:

                                        mARef.on("child_added", snap => {

                                            if(snap.val().safety === true){
                                            console.log(snap.key,snap.val().safety);
                                              getUserInfo(snap.key);
                                            }
                                          });
                                          break;
                                  case false:
                                        mARef.on("child_added", snap => {
                                            if(snap.val().safety === false){
                                            console.log(snap.key,snap.val().safety);
                                              getUserInfo(snap.key);
                                            }
                                        });
                                    break;
                                }
                break;
          default:
              break;
    }


};










function clearMachineInput(){

    $("#maTxtName").val("");
    $("#maAddId").val("");
    $("#maTxtLoc").val("");
    $("#maTxtStatus").val("");
    $("#maRemId").val("");
    return true;
}

function addedValue(name){
  alert('Success. '+name+' was added.')
}
function missingValue(){
  alert("Warning: please enter missing value.")
}

//{machineName, machineID, location, status}
function editMachines(action,machineObj){
  var mRef = firebase.database().ref().child('machines');
  var machine = machineObj;console.log("adding"+machine.machineName);
  switch(action){
    case 'add':
      mRef.child(machine.machineName).update({
        status: machine.status,
        id: machine.machineId,
        location: machine.location,

      })
      addedValue(machine.machineName);

      break;
    case 'remove':
      console.log('Removing'+machine.machineId);
      mRef.orderByChild('id').equalTo(machine.machineId).on("child_added", snap => {
        var removeObject = snap.ref;
        return removeObject.remove();
      });
      alert("Machine Id: "+machine.machineId+" was removed.");

      break
    default:
      break;
  }


  return true;

}
function displaySuperUsers (){

  //CONTAINER 1
    $("#editable1").text(" ");

            //DISPLAY ALL superusers  //clockin event
              var superUsers = firebase.database().ref().child('roles/superusers');
               superUsers.on("child_added", function (snap){

                   var sUObj = snap.val();
                   console.log(sUObj.name);

                     $("#editable1").append("\<ul>"

                     +sUObj.name +"\</ul>"
                     +"<ul>"+sUObj.email+"\<hr\>");
                   });

                var superUsers = firebase.database().ref().child('roles/superusers');
                 superUsers.on("child_removed", function (snap){

                     var sUObj = snap.val();
                     console.log(sUObj.name);

                       $("#editable1").append("\<ul>"

                       +sUObj.name +"\</ul>"
                       +"<ul>"+sUObj.email+" was removed"+"\<hr\>");
                       displaySuperUsers();
                     });


}

function displayAllMachines (){
//CONTAINER 2
    $("#editable2").text(" ");
                      //DISPLAY ALL Machines removed
                       var text= "";
                        var machineRef = firebase.database().ref().child('machines');
                         machineRef.on("child_added", snap => {
                            $("#editable2").append(
                              "<tr>"+
                              "<th>"+snap.val().id+"</th>"+
                              "<th style=\"padding-left:80px\">"+snap.key.replace(/\_/g,' ').toUpperCase().slice(0,11)+"</th>"+
                              "<th>"+snap.val().status+"</th>"+
                              "<th style=\"padding-left:80px\">"+snap.val().location+"</th>"+
                              "</td>"

                            );
                            });

                            //DISPLAY ALL Machines removed
                             var text= "";
                              var machineRef = firebase.database().ref().child('machines');
                               machineRef.on("child_removed", snap => {
                                  $("#editable2").append(
                                    "<tr>"+
                                    "<th>"+snap.val().id+"</th>"+
                                    "<th style=\"padding-left:80px\">"+snap.key.replace(/\_/g,' ').toUpperCase().slice(0,11)+"</th>"+
                                    "<th>"+snap.val().status+"</th>"+
                                    "<th style=\"padding-left:80px\">"+snap.val().location+"</th>"+
                                    "</td>"

                                  );
                                  displayAllMachines();
                                  });

}




function updateUserRole(action, emailInput){

  //  **Get User Info**
            var ref = firebase.database().ref().child('users');
            var rolesRef= firebase.database().ref().child('roles/superusers');

            var email;

            var fullname;
            var phone;

            var roleChange;
            var userid;

            //user object
            var userObject;

            //based on action add or remove
            //change role on user node
            switch (action){
                  case 'add':
                    roleChange={
                      regularuser: false,
                      superuser: true,
                      admin: false
                    }
                    break;

                  case 'remove':
                    roleChange={
                      regularuser: true,
                      superuser: false,
                      admin: false

                    }
                    break;
                  default:
                    break;
              }

              console.log(roleChange);
            ref.orderByChild('email').equalTo(emailInput).on("child_added", function (snap){
                    //console.log(snap.val());
                   userObject = snap.val();
                console.log('User to change name: '+ userObject.name + userObject.uid);

                 email = userObject.email;
                 fullname = userObject.name;
                 phone = userObject.phone;
                 userid = userObject.uid;

                if(action=='add'){
                  rolesRef.child(userid).update({
                    email: email,
                    name: fullname,
                    phone: phone
                  })
                  $("#addemail_S").val("");
                  alert(fullname+' is now a Superuser.');
                }else{
                    rolesRef.orderByChild('email').equalTo(emailInput).on("child_added", snap => {
                      var removeObject = snap.ref;
                      return removeObject.remove();
                    });
                    alert(fullname+' is no longer a Superuser.');
                }
                  $("#rememail_S").val("");

          });
            //UPDATE ROLES ON USER>>ROLE Node
            ref.orderByChild('email').equalTo(emailInput).on("child_added", function (snap){
            user= snap.val();
            userObject.roles = roleChange;
            firebase.database().ref('users/'+userObject.uid).update(userObject);
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


          // GET SIGNED IN USER INFORMATION

          var user = firebase.auth().currentUser;
          var ref = firebase.database().ref().child('users');
          //  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          var usrObject = snap.val();
          });

        displaySuperUsers ();
        //DISPLAY ALL machines
        displayAllMachines();
//
// ********CONTAINER 1******
//           //DISPLAY ALL superusers  //clockin event

               //ADD SUPER USER
                 $("#btnAddSubmit_S").click(function(){

                    var email =  $("#addemail_S").val();
                    var action = 'add';

                    updateUserRole(action, email);

                 });

                 //REMOVE SUPER USER
                   $("#btnRemSubmit_S").click(function(){
                      var email =  $("#rememail_S").val();
                      var action = 'remove';
                      updateUserRole(action, email);
                    });



//*******CONTAINER 2******
    $(document).ready(function(){
          $("#btnAddMachine").click(function(){

            //get values
            var machineName = $("#maTxtName").val();
            var machineId = $("#maAddId").val();
            var location = $("#maTxtLoc").val();
            var status = $("#maTxtStatus").val();

            function hasValue (){
              return   machineName && machineId && location && status;
            }
// userName && logIn (userName) || signUp ();
//take in array object [mName, mId, loc, status]


            //convert Machine Name to  Firebase key convention
            machineName=machineName.replace(" ","_").toLowerCase();
            machineId = machineId.trim().toLowerCase();

            var machineObj = {machineName, machineId, location, status};
            var action = 'add';
            hasValue() && editMachines(action, machineObj)&& clearMachineInput()|| missingValue();

        });
      });

          $(document).ready(function (){
            $("#btnRemoveMachine").click(function(){
              console.log('Remove button was clicked');
                var machineId = $("#maRemId").val();
                console.log(machineId);
                machineId = machineId.trim().toLowerCase();

                var action = 'remove';
                var machineObj={machineId};
                machineId && editMachines(action, machineObj)&& clearMachineInput() || missingValue();

            });
          });

//******CONTAINER 3********






                  //get all true values for other_mill
                    $("#btn1").click(function(){
                        displayTraining(true, 'other_mill');

                    });

                    $("#btn6").click(function(){
                      displayTraining(false, 'other_mill');
                    });

                    //laser engraver
                    $("#btn2").click(function(){
                        displayTraining(true, 'boss_laser_engraver');

                    });

                    $("#btn7").click(function(){
                      displayTraining(false, 'boss_laser_engraver');
                    });


                    //3d printer
                    $("#btn3").click(function(){
                        displayTraining(true, '3d_printer');

                    });

                    $("#btn8").click(function(){
                      displayTraining(false, '3d_printer');
                    });


                    //cnc mill
                    $("#btn4").click(function(){
                        displayTraining(true, 'cnc_milling_machine');

                    });

                    $("#btn9").click(function(){
                      displayTraining(false, 'cnc_milling_machine');
                    });

                    //safety
                    $("#btn5").click(function(){
                        displayTraining(true, 'safety');

                    });

                    $("#btn10").click(function(){
                      displayTraining(false, 'safety');
                    });


                    //CHANGE TRAINING status
                    $(document).ready(function(){
                          $("#btnTraining").click(function(){
                            console.log('Button Amend Training was clicked');

                            addTraining();



                      });

                    });


// JQUERY

//**Console Buttons **//
//**Update machines**


        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });


}());
