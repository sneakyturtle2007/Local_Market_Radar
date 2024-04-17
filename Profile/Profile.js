
async function getProfile(){
    var username;
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];

    var backButton = document.getElementById("backButton");
    backButton.onclick = function(){
        document.location.href = '/Search';
    }

    var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    var profileContainer = document.getElementById("profile");
    profileContainer.innerHTML = "";
    
    var profilePicture_and_username = document.createElement("div");
    profilePicture_and_username.id = "profilePicture_and_username";

    var profilePicture = document.createElement("img");
    profilePicture.className = "profilePicture";
    profilePicture.src = profile.AccountProfilePicture;

    var username_and_Email = document.createElement("div");
    username_and_Email.id = "Username_and_Email";

    var Username = document.createElement("h3");
    Username.id = "Username";
    Username.textContent = username;

    var Email = document.createElement("p");
    Email.id = "Email";
    Email.textContent = profile.AccountEmail;

    var editProfileLink = document.createElement("a");
    editProfileLink.id = "EditProfile";
    editProfileLink.href = "/EditProfile";

    var profileOptions = document.createElement("div");
    profileOptions.id = "profileOptions";

    var profileInfoButton = document.createElement("button");
    profileInfoButton.id = "profileInfoButton";
    profileInfoButton.onclick = function(){
        openProfileInfo();
    }
    profileInfoButton.textContent = "Profile Info";

    username_and_Email.appendChild(Username);
    username_and_Email.appendChild(Email);
    username_and_Email.appendChild(editProfileLink);
    profilePicture_and_username.appendChild(profilePicture);
    profilePicture_and_username.appendChild(username_and_Email);
    profileContainer.appendChild(profilePicture_and_username);
    profileOptions.appendChild(profileInfoButton);
    profileContainer.appendChild(profileOptions);
} 
async function openProfileInfo(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];
    
    var backButton = document.getElementById("backButton");
    backButton.onclick = function(){
        getProfile();
    }
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