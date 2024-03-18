// LIBRARY: mysql2
    const mysql = require('mysql2');
// DATABASE CONNECTION
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
// FUNCTION: getProducts
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
        for(var i = 0; i < results.length; i++){
            console.log(results[i]);
        }
        return await results;
    }
// FUNCTION: addProduct
    async function addProduct( ProductName, ProductPrice, ProductStock, ProductDescription) {
        let sql = "INSERT INTO products ( ProductName, ProductPrice, ProductStock, ProductDescription) VALUES ('" + ProductName + "', '" + ProductPrice + "', '" + ProductStock + "', '" + ProductDescription + "')";
        let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
        if(await results.affectedRows > 0){
            return true;
        }
        return false;
    }
// FUNCTION: deleteProduct
    async function deleteProduct(ProductName) {
        let sql = "DELETE FROM products WHERE ProductName = " + "'" + ProductName + "'";
        let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
        if(await results.affectedRows > 0){
            return true;
        }
        return false;
    }
//console.log(addProduct('test', 1.99, 100, 'test'));

// EXPORTS
    module.exports = {getProducts};