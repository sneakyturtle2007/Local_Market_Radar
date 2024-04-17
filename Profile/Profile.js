
async function getProfile(){
    var username;
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];
    var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    document.getElementsByClassName("profilePicture").src = profile.AccountProfilePicture;
    document.getElementById("Username").textContent = username;
    document.getElementById("Email").textContent = profile.AccountEmail;
} 
async function openProfileInfo(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];
    
    var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    var profileContainer = document.getElementById("profile");
    profileContainer.innerHTML = "";

    var image = document.createElement("img");
    image.src = profile.AccountProfilePicture;

    var username = document.createElement("h3");
    username.innerHTML = profile.AccountName;

    var email = document.createElement("p");
    email.innerHTML = profile.AccountEmail;

    profileContainer.append(image);
    profileContainer.append(username);
    profileContainer.append(email);

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