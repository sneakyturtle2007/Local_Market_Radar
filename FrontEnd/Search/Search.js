const settingsButton = document.querySelector(".settingsButton");
var Cookies = document.cookie;


function displayItems(items){
    var main = document.getElementById("MainItemContainer");
    main.innerHTML = "";
    
    items.forEach(function(item){
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
        main.appendChild(itemContainer);
    });
}

document.addEventListener("keypress", async function(event) {
    if (event.keyCode == 13) {
        const search = document.getElementById("search").value;
        const items = await fetch("/api/items?search=" + search).then(res => res.json()).catch(err => console.log(err) );
        displayItems(items);
    }
  });

async function search(){
    const search = document.getElementById("search").value;
    const items = await fetch("/api/items?search=" + search).then(res => res.json()).catch(err => console.log(err) );
    displayItems(items);
}

function openSettings() {
    document.getElementById("mySidebar").style.width = "250px";
}

function logout(){
    document.cookie = "loggedin=false; expires=" + 0 + "; path=/";
}

function closeSettings() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

window.onload = function(){
    
    if(document.cookie.includes("loggedin=true") != true){
        document.getElementById("logout_or_back_button").textContent = "Sign Up";
    }else{
        document.getElementById("logout_or_back_button").textContent = "Logout";
    }
};