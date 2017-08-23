function checkAdmin(userIn){
  var user= userIn;
  var state;
  var  admins = ['rgmwanik@aggies.ncat.edu', 'alanier@aggies.ncat.edu','pperry@aggies.ncat.edu','jck@ncat.edu']
console.log(user.email+' pre check.');
  for( var prop in admins){
    var emailC = admins[prop];
    console.log(admins[prop])


   if(emailC=== user.email){
     console.log('comparing: ' +emailC+ ' with: '+ user.email)

     state = true;

       switch(state){

         case true:
         setTimeout(function(){ alert('Success '+ user.email+ ' is an admin');
         window.location= "config.html";}, 3000);

          break;

         case false:
         setTimeout(function(){ alert('Failure '+ user.email+ ' is not an admin');
         window.location= "restricted.html";}, 3000);

          break;


         default:
          break;
       }
   }else{
     setTimeout(function(){ alert('Failure '+ user.email+ ' is not an admin');
     window.location= "restricted.html";}, 3000);

      break;

   }

  }
};



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





                firebase.auth().onAuthStateChanged(function(user){
                  if (user){
                        var user = firebase.auth().currentUser;
                        //Load config if user is admin.

                        //session stoage check
                        if(typeof(Storage) !== "undefined"){
                          console.log("Running function checkAdmin()");
                          checkAdmin(user);

                        }else{
                            console.log(sessionStorage.getItem('admin'));
                        }









                          } else {
                            // No user is signed in.
                            console.log("No user is signed in");
                            window.location.href = 'signin.html';
                          }
                  });

}());
