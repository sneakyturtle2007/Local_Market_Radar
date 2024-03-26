const loginButton = document.getElementById("loginButton");
document.addEventListener("keypress", async function(event) {
    if (event.keyCode == 13){
        let username = document.getElementById("Username").value;
        let password = document.getElementById("Password").value;
        var login = await fetch("/api/login?username=" + username + "&password=" + password).then(res => res.json()).catch(err => console.log(err) );
        if(login){
            window.location.href = "/itempage";
        }
        else{
            alert("Invalid username or password");
        }
    }
});
loginButton.addEventListener("click", async function(){
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    var login = await fetch("/api/login?username=" + username + "&password=" + password).then(res => res.json()).catch(err => console.log(err) );
    if(login){
        window.location.href = "/itempage";
    }
    else{
        alert("Invalid username or password");
    }
});