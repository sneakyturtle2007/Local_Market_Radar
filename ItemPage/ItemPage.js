function setup(){

    var Cookies = document.cookie.split(";");
    var item;
    for(var i = 0; i < Cookies.length; i++){
        var cookie = Cookies[i].trim();
        if(cookie.includes("item")){
            item = cookie.split("=")[1];
            item = JSON.parse(decodeURIComponent(item));
            break;
        }
    }
    if(item){
        var itemContainer = document.getElementById("container");
        itemContainer.innerHTML = "";
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = "image";

        var itemInfo = document.createElement("div");
        itemInfo.className = "ItemInfo";

        var name = document.createElement("h3");
        name.textContent = item.name;

        var priceAndStock = document.createElement("h4");
        priceAndStock.textContent = "Price: " + item.price + " | Stock: " + item.stock;

        itemInfo.appendChild(name);
        itemInfo.appendChild(priceAndStock);
        itemContainer.appendChild(img);
        itemContainer.appendChild(itemInfo);
    }else{
        console.log("No item found");
    }
    

}

window.onload = function(){
    setup();
};