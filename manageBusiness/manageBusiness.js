
async function openBusiness(){
    var cookies = document.cookie.split(";");
    var username = cookies[1].split("=")[1];

    var account = await fetch("/api/profile?username=" + username).then(res => res.json()).catch(err => console.log(err) );
    
    redrawBackButtonDiv();

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

async function openProducts(){

    var backButtonDiv = document.getElementById("backButtonDiv");

    var backButton = document.getElementById("backButton");
    backButton.onclick = function(){openBusiness();}

    var mainContainer = document.getElementById("outsideContainer");
    mainContainer.innerHTML = "";

    var addProduct = document.createElement("div");
    addProduct.id = "addProduct";
    addProduct.innerHTML = '&#43;';
    addProduct.onclick = function(){addProduct()};

    var productContainer = document.createElement("div");
    productContainer.id = "productContainer";


    
    backButtonDiv.appendChild(addProduct);
    mainContainer.appendChild(productContainer);
    
    var items = await fetch("/api/items?search=").then(res => res.json()).catch(err => console.log(err) );
    displayItems(items);

    
}


//Generic Functions

    function redrawBackButtonDiv(){
        var backButtonDiv = document.getElementById("backButtonDiv");
        backButtonDiv.innerHTML = "";
        
        var backButton = document.createElement("div");
        backButton.id = "backButton";
        backButton.innerHTML = '&#8592;'
        backButton.onclick = function(){document.location.href = '/Profile';}
        backButtonDiv.appendChild(backButton);
    }


    function displayItems(items){
        var MainContainer = document.getElementById("productContainer");
        
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
            name.innerHTML = item.name +"<br>" + "<a href='/Business'> <h5 id='businessLink'>Store: placeholder</h5> </a>"+ "<hr>";
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


//Onload function
  
    window.onload = function(){
        openBusiness();
    }