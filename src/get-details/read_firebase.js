function checklogin(){
    if((sessionStorage.getItem("authemail") == null) || (sessionStorage.getItem("authpswd") == null)){
      alert("Please login");
      location.replace("login.html");
    }
}


function getinfo(){
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
        var file_url;
        var database = firebase.database();
        var contact_details = database.ref().child("Client-Contact-Info");
        const storage = firebase.storage();
        
        contact_details.on("child_added", function(snapshot, prevChildKey) {
            var newPost = snapshot.val();
            var name = newPost.Name;
            var eid = newPost.Email;
            var message = newPost.Message;
            var phone = newPost.Phone;
            var fname = newPost.Filename;
            var d = new Date();

            var details = {
              Name : name,
              Email : eid,
              Message : message,
              Phone : phone,
              Filename : "None",
              Date : d   
            }

           
            
            //send_email();
            if (fname == "None"){
              var table = document.getElementById("myTable");
              var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              var cell6 = row.insertCell(5);
              cell1.innerHTML = name;
              cell2.innerHTML = eid;
              cell3.innerHTML = phone;
              cell4.innerHTML = d;
              cell5.innerHTML = message;
              cell6.innerHTML = "None";
            }
            else{
              //here
                storage.ref(fname).getDownloadURL()
                .then((url) => {
                  file_url = url;
                var details = {
                  Name : name,
                  Email : eid,
                  Message : message,
                  Phone : phone,
                  Filename : file_url,
                  Date : d   
                }        
                  //details.Filename = file_url;
                  var d = new Date();
                  var table = document.getElementById("myTable");
                  var row = table.insertRow();
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);
                  var cell5 = row.insertCell(4);
                  var cell6 = row.insertCell(5);
                  cell1.innerHTML = name;
                  cell2.innerHTML = eid;
                  cell3.innerHTML = phone;
                  cell4.innerHTML = d;
                  //cell5.innerHTML = file_url;
                  cell5.innerHTML = message;
                  cell6.innerHTML = file_url.link(file_url);
              });
            }
          });
            
      }    
  }
  xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
  xhttp.send();
}

getinfo();

function clear(){
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
        var db = database.ref();
        ref.child("/Client-Contact-Info").remove();           
    }    
  }
  xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
  xhttp.send();
}