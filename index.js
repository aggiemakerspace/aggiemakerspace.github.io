
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
  displayMachines();
  displayTimeEvents();

    //get elements


    //display machine ref

}());

function displayMachines(){


  var machineRef = firebase.database().ref().child("machines");
  var imageScript = " ";
  machineRef.on("child_added", snap=> {
    switch(snap.val().status) {
  case 'working':
      imageScript = "\<img style=\"margin-top: 0px;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='./makerspace/assets/img/machines/working2.png' style=\"\" alt='Working' \>";
      break;
  case 'repair':
      imageScript = "\<img  style=\"margin-top:0;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='./makerspace/assets/img/machines/repair.png' style=\"\" alt='Repair' \>";
      break;
  default:
      imageScript = "\<img  style=\"margin-top:0;float:center-fixed\" class= 'w3-round w3-border-black w3-center' height=\"42\" width=\"42\" src='./makerspace/assets/img/machines/damaged.png' style=\"\" alt='Damaged' \>";

    }
    console.log(snap.key)
//the name of each Machine
   $("#editable1").append("<h4> " +
       snap.key.replace(/\_/g,' ').toUpperCase()+"  "+"<br>"+snap.val().location+"<br>"+

     "<hr></h4>" );

     $("#editable2").append("<h4> " +
         snap.key.replace(/\_/g,' ').toUpperCase()+" <br><h3> "+snap.val().status+"</h3>"+
         imageScript+
       "<hr></h4>" );

    });

}

function displayTimeEvents(){


  var timeRef = firebase.database().ref().child('timesheetQueue');
  var timeSheet = firebase.database().ref().child('timesheet');

// ****DISPLAY CLOCK IN CLOCK OUT EVENTS
  //display user count
  timeSheet.on("value", function(snap){
    var Obj = snap.val();
    console.log(Obj);
    console.log(String(Obj.count));

    $("#userCount").html("Users Online: "+ Obj.count);
  });
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
         $("#editable4").append(
         tObj.name+" has clocked in at "+tObj.timeIn +"<hr>\</ul>"
         );
       }
     });
      //clock out event
    timeRef.on("child_removed", function (snap){

      var tObj = snap.val();
      $("#editable4").append("\<ul\>"+tObj.name+" has clocked out at "+tObj.timeOut +"\</ul><hr>");
    });
}
