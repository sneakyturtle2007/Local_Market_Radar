const settingsButton = document.querySelector(".settingsButton");



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
            name.innerHTML = item.name +"<br>" + "<a href='/Business'> <h5 id='businessLink'>PlaceHolder</h5> </a>"+ "<hr>";
            /*
            var address = document.createElement("h5");
            address.textContent = item.Address;
            address.id = "address";
            */
            var priceAndStock = document.createElement("h4");
            priceAndStock.innerHTML = "Price: " + item.price + "<br>" + "<h5 id='itemStock'>Stock: " + item.stock + "<br>" + "</h5>" + "<h5 id='address'>"+"Address: " + item.Address + "</h5>";

            var description = document.createElement("p");
            description.innerHTML = "<p style='text-align: left;'>Description:</p>" + item.description;

            itemInfo.appendChild(name);
            //itemInfo.appendChild(address);
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
    function loadSidebar(loggedin){

        var sideBarContainer = document.getElementById("mySidebar");
        sideBarContainer.innerHTML = "";

        var closeButton = document.createElement("a");
        closeButton.href = "javascript:void(0)";
        closeButton.className = "closebtn";
        closeButton.onclick = function(){closeSettings();}
        closeButton.innerHTML = '&times;';

        var searchButton = document.createElement("a");
        searchButton.href = "/Search";
        searchButton.innerHTML = "Search";
        
        sideBarContainer.appendChild(closeButton);
        sideBarContainer.appendChild(searchButton);

        if(loggedin){
        
            var profileButton = document.createElement("a");
            profileButton.href = "/Profile";
            profileButton.textContent = "Profile";
            
            var logoutButton = document.createElement("a");
            logoutButton.href = "/";
            logoutButton.onclick = function(){logout()};
            logoutButton.textContent = "Logout";
 
            sideBarContainer.appendChild(profileButton);
            sideBarContainer.appendChild(logoutButton);
        
        }else{
        
            var loginButton = document.createElement("a");
            loginButton.href = "/Login";
            loginButton.textContent = "Login";

            var signupButton = document.createElement("a");
            signupButton.href = "/Signup";
            signupButton.textContent = "Signup";

            sideBarContainer.appendChild(loginButton);
            sideBarContainer.appendChild(signupButton);

        }
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
    function logout(){
        document.cookie = "loggedin=false; expires=" + 0 + "; path=/";
    }

// ONLOAD FUNCTION

window.onload = async function(){
    
    search();
    // sidebar setup
    if(document.cookie.includes("loggedin=true")){
        loadSidebar(true);
    }else{
        loadSidebar(false);
    }

}