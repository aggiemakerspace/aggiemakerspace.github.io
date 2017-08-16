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





            // var provider = new firebase.auth.GoogleAuthProvider();
            // firebase.initializeApp(config);
                firebase.auth().onAuthStateChanged(function(user){
                  if (user){
                        var user = firebase.auth().currentUser;



                        $(document).ready(function(){
                            $("#btnAgree").click(function(){
                              console.log('Button agree was clicked');
                            var timeStamp = new Date();
                            console.log(user.uid);
                            console.log('button agree clicked');
                              firebase.database().ref().child('disclaimer/'+user.uid).update({
                              read: true,
                              date: timeStamp
                              });
                              setTimeout(function(){ alert("You have successfully signed the disclaimer agreement.");
                              window.location= "home.html";}, 1000);


                            });


                          });


                        $(document).ready(function(){
                            $("#btnDisagree").click(function(){

                                 console.log('button disagree was clicked');
                                // firebase.database().ref().child('disclaimer/'+ user.uid).update({
                                // read: true});
                                alert('You will not be able to access the User Portal unless you accept the agreement.');
                                firebase.auth().signOut();
                                console.log('user has logged out');
                            });


                          });



                          } else {
                            // No user is signed in.
                            console.log("No user is signed in");
                            window.location.href = 'signin.html';
                          }
                  });

}());
