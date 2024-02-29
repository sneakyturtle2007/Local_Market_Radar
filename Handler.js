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

function getItems(){
    var items = [];
    for(var i = 0; i < 10; i++){
    items.push(createItem('Item' + i, 100 + i, 0 ,  'This is item ' + i, 'https://i.ytimg.com/vi/_3OUQTruQRE/maxresdefault.jpg' ));
    }
    return items;
}
module.exports = {getItems};