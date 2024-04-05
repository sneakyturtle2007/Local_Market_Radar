async function getProfile(){
    var username;
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];
    

    
    var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    document.getElementsByClassName("profilePicture").src = profile.AccountProfilePicture;
    document.getElementById("Username").textContent = username;
    document.getElementById("Email").textContent = profile.AccountEmail;
}

function openSettings() {
    document.getElementById("mySidebar").style.width = "250px";
}
function closeSettings() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

window.onload = function(){
   getProfile();
}