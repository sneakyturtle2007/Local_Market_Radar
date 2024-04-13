const settingsButton = document.querySelector(".settingsButton");
var Cookies = document.cookie;


function displayItems(items){
    var main = document.getElementById("MainItemContainer");
    main.innerHTML = "";
    
    items.forEach(function(item){
        var hyperlinkContainer = document.createElement("a");
        hyperlinkContainer.onclick = function(){
            document.cookie = "item=" + encodeURIComponent(JSON.stringify(item)) + "; expires=" + 0 + "; path=/";
            window.location.href = "/ItemPage";
        };

        var itemContainer = document.createElement("div");
        itemContainer.className = "itemcontainer";
        

        var itemCard = document.createElement("div");
        itemCard.className = "itemcard";

        var img = document.createElement("img");
        img.src = item.image;
        img.alt = "image";

        var name = document.createElement("h5");
        name.className = "name";
        name.innerHTML = item.name;
    
        var price = document.createElement("p");
        price.className = "price";
        price.innerHTML = "Price: " + item.price + " | Stock: " + item.stock;

        var description = document.createElement("p");
        description.className = "description";
        description.innerHTML = "Description: " + item.description;

        itemCard.appendChild(img);
        itemCard.appendChild(name);
        itemCard.appendChild(price);
        itemCard.appendChild(description);
        itemContainer.appendChild(itemCard);
        hyperlinkContainer.appendChild(itemContainer);
        main.appendChild(hyperlinkContainer);
    });
}

document.addEventListener("keypress", async function(event) {
    if (event.keyCode == 13) {
        search();
    }
  });

async function search(){
    const search = document.getElementById("search").value;
    const items = await fetch("/api/items?search=" + search).then(res => res.json()).catch(err => console.log(err) );
    displayItems(items);
}
function logout(){
    document.cookie = "loggedin=false; expires=" + 0 + "; path=/";
}

function openItem(){
    window.href = '/ItemPage';
}
function openSettings() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeSettings() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
if(document.cookie.includes("loggedin=true") == true){
    document.getElementById("logout_or_back_button").textContent = "Log out";
}else{
    document.getElementById("logout_or_back_button").textContent = "Log in";
    document.getElementById("logout_or_back_button").href = "/Login";
    document.getElementById("Profile_button").style.display = "none";
}

window.onload = async function(){
    search();
}