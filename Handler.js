
function addItem() {
    
    let products = [];

    //ServerMain.availableItems();

   /* fetch('/Products').then(response => {
        return response.json();
    }).then(data => {   
        products = JSON.parse(data);
    }).catch(err => {
        console.log(err);
    });*/

    var success = false;

    if (products !== undefined){
        success = true;
    }
    
    let price_and_stock = document.getElementById("itemTemplate");
    let footer_template = document.getElementById("footerTemplate");

    let footer = document.getElementById("footer");
    let main = document.getElementById("main");

    for (let i = 0; i < 100; i++) {
        let clon = price_and_stock.content.cloneNode(true);
        let itemprice_itemstock = clon.querySelector("p");
        let textcontent1 = "Price: " + i + " | Stock: " + i;
        itemprice_itemstock.textContent = textcontent1;

        main.appendChild(clon);
        
    }
    let footer_content = footer_template.content.cloneNode(true);
    footer.appendChild(footer_content);

}

window.onload = addItem;