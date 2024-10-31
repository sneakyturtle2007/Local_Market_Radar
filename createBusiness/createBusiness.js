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