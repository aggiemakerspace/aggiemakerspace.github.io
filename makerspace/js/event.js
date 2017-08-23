function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
  return randomstring;
}


//DISPLAY IMAGE NAME AND SET VARIABLE

function inputImage(val){
    var input = val;
    console.log(input);

    var ref= firebase.database().ref().child('events/images');
    try{
      ref.orderByChild('name').equalTo(input).on("child_added", function (snap){

        console.log(snap.val());

      $("#eventName").val(input)
      imageLink = snap.val().downloadURL;
      });
      return imageLink;
  }catch(err){
  alert(err.message);
    //setImage(input2);

}

}
function displayImages(){

  var ref = firebase.database().ref().child('events/images');
  var count = 1;

  ref.on("child_added", function (snap){
    var name = snap.val().name;
    var imageURL= snap.val().downloadURL;

    $("#editable").append(
      "<tr>"+
        "<th scope='row'>"+count+"</th>"+
        "<td><span>"+name+"</span></td>"+
        "<td>"+
        "<img src="+ imageURL + " alt='Smiley face' height='42' width='42'>"

        +"</td>"+

      "</tr>"




    )
    count++;
  });



}
function displayEvents(){

  var ref = firebase.database().ref().child('events/events');
  ref.on("child_added", function (snap){

    console.log(snap.val());
    $("#viewEvents").append(

  


    "<div class=\"well\" style=\"width:90%; margin-top: 5%;margin-left:5%\"><div class='caption'>"+
    "<h3>"+snap.val().event_name+"</h3></div>"+
    "<img  style='margin-left: 20%' src="+ snap.val().displayPicURL + " alt='Smiley face' height='100' width='100'>"+
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
      description,
      imageURL;

    name =    $("#eventName").val();
    location = $("#eventLocation").val();
    date = $("#eventDate").val();
    instructor = $("#eventInstructor").val();
    description = $("#eventDescription").val();
    imageURL= $("#imageName").val();

    inputImage(imageURL);

    //generate event id
    var eventID = randomString();

    console.log(eventID);



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
      displayPicURL: imageLink,
      instructor:instructor,
      location: location,
      eventID: eventID

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
    var imageLink;

    firebase.auth().onAuthStateChanged(function(user) {
        //var userId = user.uid;

        if (user) {
          user.providerData.forEach(function (profile){
          });
          console.log(user);
            checkifAdmin(user);
            displayEvents();
            displayImages();
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
