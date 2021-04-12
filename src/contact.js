var file_url = "";
var file_name = "None";

function store_data(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {   
      var resp = JSON.parse(this.responseText);
      var firebaseConfig = {
      apiKey: resp.apiKey,
      authDomain : resp.authDomain,
      projectId : resp.projectId,
      databaseURL: resp.databaseURL,
      storageBucket : resp.storageBucket,
      messagingSenderId : resp.messagingSenderId,
      appId : resp.appId,
      };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }else {
          firebase.app(); // if already initialized, use that one
        }
        var database = firebase.database();
        var contact_details = database.ref().child("Client-Contact-Info");
        var name = document.getElementById("client-name").value;
        var eid = document.getElementById("client-email").value;
        var ph = document.getElementById("client-no").value;
        var message = document.getElementById("client-msg").value;
       
            var details = {
                Name : name,
                Email : eid,
                Phone : ph,
                Message : message,
                Filename : file_name,
            }
            //console.log("File name is ");
            //console.log(file_name);

            if(file_name != "None"){
              const storage = firebase.storage();
              storage.ref(file_name).getDownloadURL()
                  .then((url) => {
                    file_url = url;
                    
                    flag = 1;
                    //console.log("trying");
                    //console.log(file_url);
                    var details = {
                      Name : name,
                      Email : eid,
                      Phone : ph,
                      Message : message,
                      Pathtofile : file_name,
                      Filename : file_url,
                  }
                  send_email(details);
                });
            }
            else{
              send_email(details);
            }
            //send_email(details);
            document.getElementById("client-msg").value = "";
            document.getElementById("client-email").value = "";
            document.getElementById("client-name").value = "";
            document.getElementById("client-no").value = "";
            document.getElementById("files").value = "";
            
            contact_details.push(details);
        alert("Your details have been recorded!");
    }    
  }
  xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
  xhttp.send();
}



   
function uploadFile(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {   
      var resp = JSON.parse(this.responseText);
      var firebaseConfig = {
      apiKey: resp.apiKey,
      authDomain : resp.authDomain,
      projectId : resp.projectId,
      databaseURL: resp.databaseURL,
      storageBucket : resp.storageBucket,
      messagingSenderId : resp.messagingSenderId,
      appId : resp.appId,
      };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }else {
          firebase.app(); // if already initialized, use that one
        }
     
        
        var database = firebase.database();
        var contact_details = database.ref().child("Client-Contact-Info");
        //var file_url;
        //var file_name = "None";
        const storage = firebase.storage();
        //function uploadFile(){ 
          // Created a Storage Reference with root dir
          var storageRef = firebase.storage().ref();
          // Get the file from DOM
          var file = document.getElementById("files").files[0];
          console.log(file);
          
          //dynamically set reference to the file name
          var thisRef = storageRef.child(file.name);
          file_name = file.name;
          //put request upload file to firebase storage
          thisRef.put(file).then(function(snapshot) {
             alert("File Uploaded");
        
          });
    }    
  }
  xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
  xhttp.send();
}



/*
 storage.ref(fname).getDownloadURL()
                .then((url) => {
                  file_url = url;
              });

*/