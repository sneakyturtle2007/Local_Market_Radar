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
const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", async function(){
    const search = document.getElementById("search").value;
    const items = await fetch("/api/items?search=" + search).then(res => res.json()).catch(err => console.log(err) );
    displayItems(items);
});
const settingsButton = document.querySelector(".settingsButton");
settingsButton.addEventListener("click", async function(){
    
});
