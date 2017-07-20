
function writeUserData(timeIn, timeOut,hours,email,team) {


        firebase.database().ref('timesheet').push({
          startsAt: timeIn,
          endsAt: timeOut,
          duration: hours,
          userId: email,
          teamId: team

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

                      $("#getInput").keyup(function(event){
                          if(event.keyCode == 13){
                              $("#btnSignUp").click();
                          }
                      });

                      $(document).ready(function(){

                          $("#submit").click(function(){
                            console.log("submit button was clicked");
                            var group = $("#group").val();
                            var name = $("#group").val();
                            var timeIn= $("#txtDateTimeIn").val();
                            var timeOut = $("#txtDateTimeOut").val();

                            var ti=  new Date(timeIn);
                            var to = new Date(timeOut);
                            var diff = Math.abs(ti-to);
                            //var dateString = diff.toTimeString();
                            var time = (diff / 3600000) * 60;
                            if( time>60){
                                var h = Math.round(time/60);
                                var m = time-(h*60);
                                time = h +":"+m;

                            }
                            console.log(time);


                            $("#content").append("<h1>"+name+"</h1>"+timeIn+" "+timeOut+" Hours: "+ time );
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
              window.location.href = 'index.html';
              }

            });

}());
