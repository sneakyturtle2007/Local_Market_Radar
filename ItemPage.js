const DB = require('./DataBase.js');

class item{
    constructor(name, price, stock, description, image){
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.description = description;
      this.image = image;
    }
  }

function createItem(name, price, stock, description, image){
    return new item(name, price,stock, description, image);
}


async function getItems(){
    let Products =  await DB.getProducts(1, 'none');
    var items = [];
    
    for(var i = 0; i < Products.length; i++){
      items.push(createItem(Products[i].ProductName, Products[i].ProductPrice, Products[i].ProductStock ,  Products[i].ProductDescription, 'https://i.ytimg.com/vi/_3OUQTruQRE/maxresdefault.jpg' ));
    }

    return items;
}

module.exports = {getItems};