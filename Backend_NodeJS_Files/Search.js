const DB = require('../DataBase.js');

class item{
    constructor(name, price, stock, description, image, Address){
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.description = description;
      this.image = image;    
      this.Address = Address;  
    }
}

async function getItems(BusinessID, ProductName){
  let Products =  await DB.getProducts(BusinessID, ProductName);
  var items = [];
  
  for(var i = 0; i < Products.length; i++){
    var Address = await getBusinessAddress(Products[i].BusinessID);
    console.log(Address);
    items.push(new item(Products[i].ProductName, Products[i].ProductPrice, Products[i].ProductStock ,  Products[i].ProductDescription, Products[i].ProductImage, Address ));
  }

  return items;
}
async function getBusinessAddress(BusinessID){
  let Business =  await DB.getBusiness(BusinessID);
  
  return await (Business.Address + ", " + Business.City + ", " + Business.State + ", " + Business.Country);
}

module.exports = {getItems};