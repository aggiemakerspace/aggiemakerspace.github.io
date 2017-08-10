
function changeMachineStatus(machineId){
var status = $("#mQStatus").val();
console.log(status);
var machineRef = firebase.database().ref().child("machines");
machineRef.orderByChild('id').equalTo(machineId).on("child_added", function (snap){
    var mObj = snap.val();
    var machineName = snap.key;
    mObj.status = status;

    machineRef.child(machineName).update(mObj);
displayMachineStatus();


  });

}



function displayMachineStatus(){

  $("#editable").text(" ");
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

   $("#editable").append("<p> " +
       snap.key.replace(/\_/g,' ').toUpperCase()+" | "+snap.val().location+
       imageScript+
     "</p>" );
    console.log(snap.key);
    });

}
function searchTraining(){
    var emailInput = $("#trEmail").val();
      $("#editable3").text(" ");
    function alertEmpty(){
      alert("Warning: some values are missing");
    }

    //get the machine name from given machine id
    //get uid before search machine approval
    firebase.database().ref().child('users').orderByChild('email').equalTo(emailInput).on("child_added", function (snap){
      var userid = snap.val().uid;
      var string = "";
      var mApprRef  = firebase.database().ref().child('machine_approval/'+userid);
      mApprRef.on("child_added", snap=> {
        switch(snap.val()) {
      case true:
          string = "<span style='color:green'> Has completed training.</span>"
          break;

      case false:
          string = "<span style='color:red'> Has not completed training.</span>"
          break;

      default:
          break;

        }

        //console.log(snap.key, snap.val());
       $("#editable3").append(


           "<h4>"+snap.key.replace(/\_/g,' ').toUpperCase()
           +string+"</h4>"

          );
        //console.log(snap.key);
        });

    });

}

//container 3 display all users emails
function showAllEmails(){

    $("#editable3").text(" ");
    firebase.database().ref().child('emails').orderByChild('email').on("child_added", function (snap){

      $("#editable3").append(
          "<h4>"+snap.val().email+
          "</h4>"
         );
   });

}

function addTraining(){
  var statusList = [" ", true, false];
  var emailInput = $("#trEmail").val();
  var statusNum = $("#trStatus").val();

  var status = statusList[statusNum];
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


        alert('Updated ' +emailInput+" "+machineName);
        searchTraining();








}










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
                     +"<ul>"+sUObj.email+"<hr>");
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
        //displayMachineStatus
        displayMachineStatus();
//****QUICK Machine status*****

$("#btnqMachine").click(function(){

  var mId = $("#qMachineId").val();

   changeMachineStatus(mId);
});
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

                      //search button
                      $("#trSearch").click(function(){
                          searchTraining();

                      });

                      //Show all emails
                      $("#trSearchUsers").click(function(){
                          showAllEmails();
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
