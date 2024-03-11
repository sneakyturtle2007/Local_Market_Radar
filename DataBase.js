const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',   
    database: 'Main'
});
con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");    
});



async function getProducts(BusinessID, ProductName) {
    let sql;
    if(BusinessID > 0){
        sql = "SELECT * FROM products WHERE ProductName LIKE '%" + ProductName + "%' AND BusinessID LIKE '%" + BusinessID + "%'";
    }else if(ProductName != ''){
        sql = "SELECT * FROM products WHERE ProductName LIKE '%" + ProductName + "%'";
    }else{
        sql = "SELECT * FROM products";
    }
    
    let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
    console.log(results);
    for(var i = 0; i < results.length; i++){
        console.log(results[i]);
    }
    return await results;
}


module.exports = {getProducts};