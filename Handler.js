function addItem() {
    console.log("Handler.js running")
    let price_and_stock = document.getElementById("itemTemplate");
    let footer_template = document.getElementById("footerTemplate");
    let footer = document.getElementById("footer");
    let main = document.getElementById("main");
    for (let i = 0; i < 100; i++) {
        let clon = price_and_stock.content.cloneNode(true);
        let itemprice_itemstock = clon.querySelector("p");
        itemprice_itemstock.textContent = "Price: " + i + " | Stock: " + i;

        main.appendChild(clon);
        
    }
    let footer_content = footer_template.content.cloneNode(true);
    footer.appendChild(footer_content);
}

window.onload = addItem;