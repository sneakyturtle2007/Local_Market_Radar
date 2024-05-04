// LIBRARY: mysql2
    const mysql = require('mysql2');
    var fs = require('fs');
// VARIABLES
// DATABASE CONNECTION
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',   
        database: 'Main'
    });
    con.connect(function(err) {
            if (err) throw err;
            console.log("Database Connected!");    
    });
// DOCUMENTATION
    async function updateDatabaseDocumentation(){
        var documentation = "";
        documentation += "All tables in database - \n";

        let[results, fields] =  await con.promise().query("SHOW TABLES").catch((err) => {console.log(err);});
        console.log("Show tables query for documentation: ");
        console.log(await results);
        for(var i = 0; i < results.length; i++){
            documentation += "    "
            documentation += await results[i].Tables_in_main ;
            documentation += "\n";
        }
        
        documentation += "\n\n";
        fs.writeFileSync("DatabaseDocumentation.txt", documentation);
    }
// TABLE - accounts

    // FUNCTION: createAccount
        async function createAccount(name, password){
            let sql = "INSERT INTO accounts (AccountName , AccountPasscode, BusinessName) VALUES ('" + name + "', '" + password + "', 'None')";
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            if(await results.affectedRows > 0){
                return true;
            }
            return false;
        }
    
    // FUNCTION: getAccount
        async function getAccount(name){
            console.log("Database.js getAccount() username input: " + name);
            let sql = "SELECT * FROM accounts WHERE AccountName = '" + name + "'" ;
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            updateDatabaseDocumentation();
            if(await results.length > 0){
                console.log(await results);
                return await results;
            }else{
                return false;
            }
            
        }
    // FUNCTION: deleteAccount
        async function deleteAccount(name){
            let sql = "DELETE FROM accounts WHERE AccountName = " + "'" + name + "'";
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            if(await results.affectedRows > 0){
                return true;
            }else{
                return false;
            }
           
        }

// TABLE - businesses

    // FUNCTION: createBusiness
        async function createBusiness(name, Address, City, State, Country){
            let sql = "INSERT INTO businesses (BusinessName, Address, City, State, Country) VALUES ('" + name + "', '"+ Address + "', '" + City + "', '" + State + "', '" + Country + "')";
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            if(await results.affectedRows > 0){
                return true;
            }
            return false;
        }
    // FUNCTION: getBusiness
        async function getBusiness(BusinessID_or_Name){
            let sql;
            if(typeof(BusinessID) == 'string'){
                sql = "SELECT * FROM businesses WHERE BusinessName = " + "'" + BusinessID_or_Name + "'";
            }else{
                sql = "SELECT * FROM businesses WHERE BusinessID = " + BusinessID_or_Name ;
            }
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            if(await results.length > 0){
                return await results[0];
            }else{
                return false;
            }
        }
    // FUNCTION: deleteBusiness
        async function deleteBusiness(BusinessID){
            let sql = "DELETE FROM businesses WHERE BusinessID = " + "'" + BusinessID + "'";
            let [results, fields] = await con.promise().query(sql).catch((err) => { console.log(err); });
            if(await results.affectedRows > 0){
                return true;
            }
            return false;
        }

// TABLE - products

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




// EXPORTS
    module.exports = {getProducts, addProduct, deleteProduct, createAccount, deleteAccount, getAccount, createBusiness, getBusiness, deleteBusiness};