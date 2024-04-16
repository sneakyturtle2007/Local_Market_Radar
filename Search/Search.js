const settingsButton = document.querySelector(".settingsButton");
var Cookies = document.cookie;


// SEARCHBAR functionality and DISPLAYITEMS function
    function displayItems(items){
        var MainContainer = document.getElementById("MainContainer");
        MainContainer.innerHTML = "";
        
        
        items.forEach(function(item){
            var linkContainer = document.createElement("div");
            linkContainer.onclick = function(){DisplayItem(item);}

            var itemContainer = document.createElement("div");
            itemContainer.className = "itemcontainer";
            

            var itemCard = document.createElement("div");
            itemCard.className = "itemcard";

            var img = document.createElement("img");
            img.src = item.image;
            img.alt = "image";

            var name = document.createElement("h5");
            name.className = "name";
            name.textContent = item.name;
        
            var price = document.createElement("p");
            price.className = "price";
            price.textContent = "Price: " + item.price + " | Stock: " + item.stock;

            var description = document.createElement("p");
            description.className = "description";
            description.textContent = "Description: " + item.description;

            itemCard.appendChild(img);
            itemCard.appendChild(name);
            itemCard.appendChild(price);
            itemCard.appendChild(description);
            itemContainer.appendChild(itemCard);
            linkContainer.appendChild(itemContainer);
            MainContainer.appendChild(linkContainer);
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

// DISPLAYITEM function

    function DisplayItem(passedItem){

        var item = passedItem;

        if(item){
            var MainContainer = document.getElementById("MainContainer");
            MainContainer.innerHTML = "";

            var backButtonDiv = document.createElement("div");
            backButtonDiv.id = "backButtonDiv";

            var backButton = document.createElement("div");
            backButton.innerHTML = '&#8592;';
            backButton.id = "backButton";
            backButton.onclick = function(){search();};

            var itemContainer = document.createElement("div");
            itemContainer.id = "container";
            var img = document.createElement("img");
            img.id = "itemImage";
            img.src = item.image;
            img.alt = "image";
            var itemInfo = document.createElement("div");
            itemInfo.className = "ItemInfo";

            var name = document.createElement("h2");
            name.textContent = item.name;
            
            var address = document.createElement("h4");
            address.textContent = item.Address;

            var priceAndStock = document.createElement("h4");
            priceAndStock.textContent = "Price: " + item.price + " | Stock: " + item.stock;

            var description = document.createElement("p");
            description.textContent = item.description;

            itemInfo.appendChild(name);
            itemInfo.appendChild(address);
            itemInfo.appendChild(priceAndStock);
            itemInfo.appendChild(description);
            itemContainer.appendChild(img);
            itemContainer.appendChild(itemInfo);
            backButtonDiv.appendChild(backButton);
            MainContainer.appendChild(backButtonDiv);
            MainContainer.appendChild(itemContainer);
        }else{
            console.log("No item found");
        }
    }

// SIDEBAR
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
    function logout(){
        document.cookie = "loggedin=false; expires=" + 0 + "; path=/";
    }
// CHECK IF LOGGED IN
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