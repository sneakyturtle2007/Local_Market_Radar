const DB = require('../DataBase.js');

class item{
    constructor(name, price, stock, description, image){
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.description = description;
      this.image = image;
    }
}



async function getItems(BusinessID, ProductName){
    let Products =  await DB.getProducts(BusinessID, ProductName);
    var items = [];
    
    for(var i = 0; i < Products.length; i++){
      items.push(new item(Products[i].ProductName, Products[i].ProductPrice, Products[i].ProductStock ,  Products[i].ProductDescription, 'https://i.ytimg.com/vi/_3OUQTruQRE/maxresdefault.jpg' ));
    }

    return items;
}

module.exports = {getItems};