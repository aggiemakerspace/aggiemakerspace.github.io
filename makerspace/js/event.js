
function displayEvents(){

  var ref = firebase.database().ref().child('events/events');
  ref.on("child_added", function (snap){

    console.log(snap.val());
    $("#viewEvents").append("<div class=\"well\" style=\"width:90%; margin-top: 5%;margin-left:5%\"><div class='caption'>"+
    "<h3>"+snap.val().event_name+"</h3></div>"+
    "<h4>"+snap.val().date+"</h4><br>"

    +snap.val().instructor+"<br>"
    +snap.val().location+"<br>"

    +"</div>"
    );


  });
}
function createEvent(){

alert();
//get element values

  var name,
      location,
      date,
      instructor,
      description;

    name =    $("#eventName").val();
    location = $("#eventLocation").val();
    date = $("#eventDate").val();
    instructor = $("#eventInstructor").val();
    description = $("#eventDescription").val();

    //event node
    var ref = firebase.database().ref().child('events/events');
    ref.push({
      attendees:
      {
        count: 0,
        email: ""

      },
      event_name: name,
      date: date,
      description: description,
      displayPicURL: " ",
      instructor:instructor,
      location: location

    });



}


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
           case 'administrator':

             adminAccess = true;
             console.log("Admin Approved");
             $("#.hideme" ).remove();
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
    const logout = document.getElementById('logout');

    firebase.auth().onAuthStateChanged(function(user) {
        //var userId = user.uid;

        if (user) {
          user.providerData.forEach(function (profile){
          });
          console.log(user);
            checkifAdmin(user);
            displayEvents();
          // User is signed in.



            $("#btnSubmit").click(function(){
              console.log('buton clicked');
              createEvent();





          });

          var user = firebase.auth().currentUser;

        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });










}());
