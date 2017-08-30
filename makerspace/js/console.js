


//search by

function displayInfo(emailInput){

        var email = emailInput;

         firebase.database().ref().child('users').orderByChild('email').equalTo(email).on('child_added',function (snap){
          //data = JSON.stringify(snap.val());
          //  console.log(snap.val().email + " " +snap.val().uid);
                 var
                  email,
                  name,
                  major,
                  phone,
                  year,
                  picURL;

                  email = snap.val().email;
                  name = snap.val().name;
                  major = snap.val().major_class;
                  phone = snap.val().phone;
                  year = snap.val().year_class;
                  picURL = snap.val().photoURL;
                  uid = snap.val().uid;

                  console.log();
                          var output = '<div class="row">';
                          var count = 1;

              				  output += '<div class="col-md-6 well">';
              				  output += '<div class="col-md-3"><img class="img-circle center-block img-responsive" src="'+picURL+'" alt="'+ name +'"style="height:100px;width:100px" /></div>';
              				  output += '<div class="col-md-7">';
              				  output += '<h3>' + name + '</h3>';
              				  output += '<h4>' + email + '</h4>';
                        output += '<h4>' + major + '</h4>';
                        output += '<h4>' + phone +'</h4>';


                      //   var mApprRef  = firebase.database().ref().child('machine_approval/'+uid);
                      //   var string = " ";
                      //   mApprRef.on("child_added", snap=> {
                      //     console.log(snap.key, snap.val())
                      //
                      //     output += "<h2>"+ snap.key+"</h2>" + "<h4>"+ snap.val()+'</h4>';
                      //
                      //     return string;
                      // });

                      // console.log(string)
                      //   output += string;

                        output += '</div>';
              				  output += '</div>';
              				  if(count%2 == 0){
              					output += '</div><div class="row">'
              				  }
              				  count++;


              			  output += '</div>';
              			  $('#editable1').append(output);
                      });





}
//show all users and their information
function displayUserInfo(){

    $("#editable1").text(" ");
    var emailRef =  ref = firebase.database().ref().child('emails/verified');

     emailRef.orderByChild('email').on("child_added", function (snap){
       var userRef = snap.val();

       var email = userRef.email;
       displayInfo(email);
          });


}



function displaySuperUsers (){

  //CONTAINER 1
    $("#editable1").text(" ");

            //DISPLAY ALL superusers  //clockin event
              var superUsers = firebase.database().ref().child('roles/superusers');
               superUsers.on("child_added", function (snap){

                   var email = snap.val().email;
                   displayInfo(email);
                   });


}





(function() {

    var provider = new firebase.auth.GoogleAuthProvider();
    var dataArray= new Array;
    var machineObj;

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
          checkifAdmin(user);

          // GET SIGNED IN USER INFORMATION

          var user = firebase.auth().currentUser;
          var ref = firebase.database().ref().child('users');
          //  **Get User Info**
          ref.orderByChild('email').equalTo(user.email).on("child_added", function (snap){
          var usrObject = snap.val();
          });

          getUserObjects();


          //data


        function getUserObjects(){
            let emailRef = firebase.database().ref().child('emails/verified');
            emailRef.orderByChild('email').on('child_added', function (snap){
              let email= snap.val().email;
              getInfo(email)

            })


        }

        function getInfo(emailInput){
          var email = emailInput;
          //var data = new Array();
          firebase.database().ref().child('users').orderByChild('email').equalTo(email).on('child_added',function (snap){
            dataArray.push(snap.val());
            //dataArray.push(JSON.stringify(snap.val()));
            //console.log(data)

         });
         console.log(dataArray)



        }

          $(document).ready(function(){



                //Dislay user information
                $("#btn2").click(function(){


                   $("#container").removeClass("hide");
                   $('#filter-records').addClass("hide");
                    displayUserInfo ();
                });

                $("#btn3").click(function(){
                  $("#container").removeClass("hide");
                  $('#filter-records').addClass("hide");
                   displaySuperUsers();

                 });


//get user input
                 $("#userIn").each(function(){

                     $(this).keyup(function(event){
                          if(event.keyCode == 13){
                                 let value = $("#userIn").val();



                           }
                       });
                   });



                  //Search for users
                  $('#txt-search').keyup(function(){
                    $('#filter-records').removeClass("hide");
                    $("#container").addClass("hide");

            var searchField = $(this).val();


			if(searchField === '')  {
				$('#filter-records').html('');
				return;
			}


            var regex = new RegExp(searchField, "i");
                var output = '<div class="row">';
                var count = 1;
    			  $.each(dataArray, function(key, val){
    				if ((val.name.search(regex) != -1) || (val.email.search(regex) != -1)) {
    				  output += '<div class="col-md-6 well">';
    				  output += '<div class="col-md-3"><img class="img-circle center-block img-responsive" src="'+val.photoURL+'" alt="'+ val.name +'"style="height:100px;width:100px" /></div>';
    				  output += '<div class="col-md-7">';
    				  output += '<h3>' + val.name + '</h3>';
    				  output += '<h4>' + val.email + '</h4>';
              output += '<h4>' + val.major_class + '</h4>';
    				  output += '</div>';
    				  output += '</div>';
    				  if(count%2 == 0){
    					output += '</div><div class="row">'
    				  }
    				  count++;
    				}
    			  });
    			  output += '</div>';
    			  $('#filter-records').html(output);
            });






    });//document close







        } else {
          // No user is signed in.
          console.log("No user is signed in");
          window.location.href = 'signin.html';
        }
      });


}());

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


        if ((roles[prop]) === true )
       {

         switch(prop){
           case 'admin':

             adminAccess = true;
             console.log("Admin Approved");
             $("#btnAdmin" ).removeClass("config-hideme");
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
