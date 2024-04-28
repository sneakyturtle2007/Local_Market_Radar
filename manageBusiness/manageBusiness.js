async function openBusiness(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];

    var account = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    //var Business = await fetch("/api/business?"+ account.BusinessName).then(res => res.json()).catch(err => console.log(err));

    var profileContainer = document.getElementById("container");
    profileContainer.innerHTML = "";

    var profilePicture_and_username = document.createElement("div");
    profilePicture_and_username.id = "profilePicture_and_username";

    var profilePicture = document.createElement("img");
    profilePicture.id= "profilePicture";
    profilePicture.src = account.accountProfilePicture;

    var username_and_Email = document.createElement("div");
    username_and_Email.id = "Username_and_Email";

    var Username = document.createElement("h3");
    Username.id = "Username";
    Username.textContent = username;

    var Email = document.createElement("p");
    Email.id = "Email";
    Email.textContent = account.accountEmail;

    var editProfileLink = document.createElement("a");
    editProfileLink.id = "EditProfile";
    editProfileLink.href = "/EditProfile";

    username_and_Email.appendChild(Username);
    username_and_Email.appendChild(Email);
    username_and_Email.appendChild(editProfileLink);
    profilePicture_and_username.appendChild(profilePicture);
    profilePicture_and_username.appendChild(username_and_Email);
    profileContainer.appendChild(profilePicture_and_username);
    
}
// SIDE BAR FUNCTIONS
    function openSettings() {
        document.getElementById("mySidebar").style.width = "250px";
    }
    function closeSettings() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
    function logout(){
        document.cookie = "loggedin=false; expires=" + 0 + "; path=/";
    }

// ONLOAD FUNCTION
window.onload = function(){
    openBusiness();
 }