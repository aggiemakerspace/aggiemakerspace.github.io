function getDuration(durationInput){

    var   s
        , m
        , seconds
        , h
        , minutes
        , days
        , hours;

    s= durationInput;
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
    return timeStamp;
}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function myFunction(stringDate) {
    var d = new Date(stringDate);
    var x = document.getElementById("demo");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var dateOutput = h + ":" + m + ":" + s;
    return dateOutput;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function getDisplay(dateInput){


  var givenDate = dateInput;

  var time = firebase.database().ref().child("timesheet");
  var uid = 'jxlohcP3gQXZV2MfSEC44pAOgzj2';
  var emailsIn = " ";
  var emailsRef = firebase.database().ref().child('emails/verified');
    $("#table-body-pengguna").text(" ");
          emailsRef.on("child_added",function (snap){
                  emailsIn = snap.key;
                  console.log(emailsIn);

                  time.child(emailsIn).on("child_added",function (snap){
                          givenDate =   new Date($("#datepicker").val()).toLocaleDateString('en-US');
                          if(snap.val().date === givenDate){

                          console.log(
                                  snap.val().name+
                                  snap.val().email+
                                  snap.val().timeIn+
                                  snap.val().timeOut+
                                  snap.val().duration

                  );
                  var timePrintIn = myFunction(snap.val().timeIn);
                  var timePrintOut = myFunction(snap.val().timeOut);
                  var duration = getDuration(snap.val().duration);
                  console.log(duration);
                  $("#table-body-pengguna").append("<tr><td style=''>" + snap.val().name + "</td><td style=''>" + snap.val().email +
                      "</td><td>" + timePrintIn + "</td><td>" + timePrintOut + "</td><td>" + duration+ "</td></tr><br><hr>");




                          }
                  });
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
    //var userId = user.uid;
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var dateNow = new Date();
        dateNow=dateNow.toLocaleDateString('en-US');
        $("#datepicker").val(dateNow);
        var dateIn = $("#datepicker").val();

        //run to display timesheet
        //getDisplay(dateIn);
                      $("#getInput").keyup(function(event){
                          if(event.keyCode == 13){
                              $("#btnSignUp").click();
                          }
                      });


                      $(document).ready(function(){
                        $("#displayTime").click(function(){
                          dateNow= new Date($("#datepicker").val());
                          dateNow.setDate(dateNow.getDate());
                          $("#datepicker").val(dateNow.toLocaleDateString('en-US'));
                          var dateIn = $("#datepicker").val();
                          console.log(myFunction(dateIn));
                          console.log(dateIn);
                          getDisplay(dateIn);
                        });

                          $("#btnLeft").click(function(){
                          dateNow= new Date($("#datepicker").val());
                          dateNow.setDate(dateNow.getDate() - 1);
                          $("#datepicker").val(dateNow.toLocaleDateString('en-US'));
                          var dateIn = $("#datepicker").val();
                          console.log(myFunction(dateIn));
                          console.log(dateIn);
                          getDisplay(dateIn);
                          });

                          $("#btnRight").click(function(){
                            dateNow= new Date($("#datepicker").val());
                            dateNow.setDate(dateNow.getDate() + 1);
                            $("#datepicker").val(dateNow.toLocaleDateString('en-US'));
                            var dateIn = $("#datepicker").val();
                            console.log(dateIn);
                            getDisplay(dateIn);

                          });




                          $("#logout").click(function(){

                            <!-- Log out-->
                                logout.addEventListener('click', e => {
                                console.log(name+"is signing out.");
                                firebase.auth().signOut();});


                          });


                      });


              } else
              {
              // No user is signed in.
              console.log("No user is signed in");
              window.location.href = 'signin.html';
              }

            });

}());
