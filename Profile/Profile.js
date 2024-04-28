
async function getProfile(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];

    var backButton = document.getElementById("backButton");
    backButton.onclick = function(){
        document.location.href = '/Search';
    }

    var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    var profileContainer = document.getElementById("profile_and_Business");
    profileContainer.innerHTML = "";
    
    var profilePicture_and_username = document.createElement("div");
    profilePicture_and_username.id = "profilePicture_and_username";

    var profilePicture = document.createElement("img");
    profilePicture.id= "profilePicture";
    profilePicture.src = profile.accountProfilePicture;

    var username_and_Email = document.createElement("div");
    username_and_Email.id = "Username_and_Email";

    var Username = document.createElement("h3");
    Username.id = "Username";
    Username.textContent = username;

    var Email = document.createElement("p");
    Email.id = "Email";
    Email.textContent = profile.accountEmail;

    var editProfileLink = document.createElement("a");
    editProfileLink.id = "EditProfile";
    editProfileLink.href = "/EditProfile";

    var profileOptions = document.createElement("div");
    profileOptions.id = "profileOptions";

    var profileInfoButton = document.createElement("button");
    profileInfoButton.id = "profileInfoButton";
    profileInfoButton.innerHTML = "Profile Info";
    profileInfoButton.onclick = function(){
        openProfileInfo();
    }
    profileInfoButton.textContent = "Profile Info";
    if(profile.businessName != "None"){
        var businessButton = document.createElement("button");
        businessButton.id = "businessButton";
        businessButton.innerHTML = "Manage Business";
        businessButton.onclick = function(){
            window.location.href = "/manageBusiness";
        }
    }else{
        var businessButton = document.createElement("button");
        businessButton.id = "businessButton";
        businessButton.innerHTML = "Create Business";
        businessButton.onclick = function(){
            window.location.href = "/createBusiness";
        }
    }
    username_and_Email.appendChild(Username);
    username_and_Email.appendChild(Email);
    username_and_Email.appendChild(editProfileLink);
    profilePicture_and_username.appendChild(profilePicture);
    profilePicture_and_username.appendChild(username_and_Email);
    profileContainer.appendChild(profilePicture_and_username);
    profileOptions.appendChild(profileInfoButton);
    profileOptions.appendChild(businessButton);
    profileContainer.appendChild(profileOptions);
} 
// PROFILE INFO BUTTON 
    async function openProfileInfo(){
        var cookies = document.cookie.split(";");
        var username = cookies[1].split("=")[1];
        
        var backButton = document.getElementById("backButton");
        backButton.onclick = function(){
            getProfile();
        }
        var profile = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
        
        var profileContainer = document.getElementById("profile_and_Business");
        profileContainer.innerHTML = "";

        var profileInfo = document.createElement("div");
        profileInfo.id = "profileInfo";

        var image = document.createElement("img");
        image.src = profile.accountProfilePicture;
        

        var username = document.createElement("h3");
        username.innerHTML = "Username: " + profile.accountName + "<br>";
        

        var email = document.createElement("p");
        email.innerHTML ="Email: " +  profile.accountEmail + "<br>";
        

        var address = document.createElement("p");
        address.innerHTML ="Address: " + profile.accountAddress;
        

        profileInfo.appendChild(image);
        profileInfo.appendChild(username);
        profileInfo.appendChild(email);
        profileInfo.appendChild(address);
        profileContainer.appendChild(profileInfo);
    }
 
// SIDEBAR

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
// PAGE STARTUP
window.onload = function(){
   getProfile();
}