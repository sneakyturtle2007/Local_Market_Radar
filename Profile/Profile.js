async function getProfile(){
    var username;
    for(var i =  document.cookie.indexOf("username=") + 9; i < document.cookie.length; i++){
        if(document.cookie[i] != ";"){
            username += document.cookie[i];
        }else{
            break;
        }
    }
    var profile = await fetch("/api/profile?" + username).then(res => res.json()).catch(err => console.log(err) );
    //document.getElementsByClassName("profilePicture").src = profile.AccountProfilePicture;
}

function openSettings() {
    document.getElementById("mySidebar").style.width = "250px";
}
function closeSettings() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

window.onload = function(){
   // getProfilePicture();
}