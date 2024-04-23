async function openBusiness(){
    var Business = await fetch("/api/")
    var profileContainer = document.getElementById("profile&Business");
    profileContainer.innerHTML = "";

}