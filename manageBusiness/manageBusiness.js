async function openBusiness(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];

    var account = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    var backButton = document.getElementById("backButton");
    backButton.onclick = function(){document.location.href = '/Profile';}

    var mainContainer = document.getElementById("outsideContainer");
    mainContainer.innerHTML = "";

    var profileContainer = document.createElement("div");
    profileContainer.id = "container";
    profileContainer.innerHTML = "";

    var profilePicture_and_username = document.createElement("div");
    profilePicture_and_username.id = "profilePicture_and_username";

    var profilePicture = document.createElement("img");
    profilePicture.id= "profilePicture";
    profilePicture.src = account.accountProfilePicture;

    var username_and_Email = document.createElement("div");
    username_and_Email.id = "Username_and_Email";

    var Username = document.createElement("h3");
    Username.id = "Username";
    Username.textContent = username;

    var Email = document.createElement("p");
    Email.id = "Email";
    Email.textContent = account.accountEmail;

    var editProfileLink = document.createElement("a");
    editProfileLink.id = "EditProfile";
    editProfileLink.href = "/EditProfile";
    editProfileLink.textContent = "Edit Business Info";

    var profileOptions = document.createElement("div");
    profileOptions.id = "profileOptions";

    var Products = document.createElement("button");
    Products.id = "ProductsButton";
    Products.textContent = "Products";
    Products.onclick = function(){openProducts();}

    username_and_Email.appendChild(Username);
    username_and_Email.appendChild(Email);
    username_and_Email.appendChild(editProfileLink);
    profilePicture_and_username.appendChild(profilePicture);
    profilePicture_and_username.appendChild(username_and_Email);
    profileContainer.appendChild(profilePicture_and_username);
    profileOptions.appendChild(Products);
    profileContainer.appendChild(profileOptions);
    mainContainer.appendChild(profileContainer);
    
}
// Products
    async function openProducts(){

        var backButtonDiv = document.getElementById("backButtonDiv");

        var backButton = document.getElementById("backButton");
        backButton.onclick = function(){openBusiness();}

        var mainContainer = document.getElementById("outsideContainer");
        mainContainer.innerHTML = "";

        var addProduct = document.createElement("button");
        addProduct.id = "addProduct";
        addProduct.textContent = "Add Product";
        addProduct.onclick = function(){addProduct()};

        var productContainer = document.createElement("div");
        productContainer.id = "productContainer";


        
        backButtonDiv.appendChild(addProduct);
        mainContainer.appendChild(productContainer);
        
        var items = await fetch("/api/items?search=").then(res => res.json()).catch(err => console.log(err) );
        displayItems(items);

        
    }
    function displayItems(items){
        var MainContainer = document.getElementById("productContainer");
        
        items.forEach(function(item){
            var linkContainer = document.createElement("div");
            //linkContainer.onclick = function(){DisplayItem(item);}

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

    
// SIDE BAR FUNCTIONS
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
window.onload = function(){
    openBusiness();
}