const ServerMain = require('./ServerMain.js');

function addItem() {
    
    let accounts = accounts();

    while (accounts === undefined) {
        if (accounts !== undefined) { 
            let price_and_stock = document.getElementById("itemTemplate");
            let footer_template = document.getElementById("footerTemplate");

            let footer = document.getElementById("footer");
            let main = document.getElementById("main");

            for (let i = 0; i < 100; i++) {
                let clon = price_and_stock.content.cloneNode(true);
                let itemprice_itemstock = clon.querySelector("p");
                let textcontent1 = "Price: " + i + " | Stock: " + i + accountsu;
                itemprice_itemstock.textContent = textcontent1;

                main.appendChild(clon);
                
            }
            let footer_content = footer_template.content.cloneNode(true);
            footer.appendChild(footer_content);
            break;
        }
    }

   
}

window.onload = addItem;