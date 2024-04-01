
document.addEventListener("keypress", async function(event) {
    if (event.keyCode == 13){
        let username = document.getElementById("Username").value;
        let password = document.getElementById("Password").value;
        let remember = document.getElementById("RememberMe")
        var login = await fetch("/api/login?username=" + username + "&password=" + password).then(res => res.json()).catch(err => console.log(err) );
        if(login){

            if(remember){
                let date = new Date();
                date.setTime(date.getTime() + (4*7*24*60*60*1000));
                document.cookie = "loggedin=true; expires=" + date.toUTCString + "; path=/Login; path=/Search; path=/Profile";
            }else{
                document.cookie = "loggedin=true; expires=" + 0 + "; path=/Login; path=/Search; path=/Profile";
            }
            window.location.href = "/Search";
        }
        else{
            alert("Invalid username or password");
        }
    }
});
async function checkLogin(){
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let remember = document.getElementById("RememberMe").checked;
    var login = await fetch("/api/login?username=" + username + "&password=" + password).then(res => res.json()).catch(err => console.log(err) );
    if(login){
        
        if(remember){
            let date = new Date();
            date.setTime(date.getTime() + (4*7*24*60*60*1000));
            document.cookie = "loggedin=true; expires=" + date.toUTCString() + "; path=/";
        }else{
            document.cookie = "loggedin=true; expires=" + 0 + "; path=/";
        }
    
        window.location.href = "/Search";
    }
    else{ 
        alert("Invalid username or password");
    }
}
function rememberAlert(){
    let remember = document.getElementById("RememberMe").checked;
    if(remember){
        alert("Checking this box will have you automatically log in for 4 weeks.");
    }
}
window.onload = function(){
    let Cookie =document.cookie;
    if(Cookie.includes("loggedin=true")){
        window.location.href = "/Search";
    }
};