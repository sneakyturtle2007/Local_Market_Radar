
async function SignUp(){
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let password2 = document.getElementById("Password2").value;
    if(password != password2){
        alert("Passwords do not match");
        return;
    }
    var login = await fetch("/api/signup?username=" + username + "&password=" + password).then(res => res.json()).catch(err => console.log(err) );
    if(login){
        window.location.href = "/Search";
    }
    else{
        alert("Username Taken");
    }
}

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async function(){
   SignUp();
});

document.addEventListener("keypress", async function(event) {
    if (event.keyCode == 13){
        SignUp();
    }
});