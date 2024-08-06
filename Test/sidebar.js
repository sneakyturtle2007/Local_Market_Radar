// LIBRARY: better-sqlite3, fs
const Database = require('better-sqlite3');
var fs = require('fs');
// LOCAL IMPORTS
const UpdateDocumentation = require('./DB_Documentor.js');

// DATABASE CONNECTION
const Database = new Database('my-database.Database'); // Use a file-based SQLite database

// Create tables if they don't exist
Database.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
        AccountID INTEGER PRIMARY KEY AUTOINCREMENT,
        AccountName TEXT,
        AccountPasscode TEXT,
        BusinessName TEXT
    );
    CREATE TABLE IF NOT EXISTS businesses (
        BusinessID INTEGER PRIMARY KEY AUTOINCREMENT,
        BusinessName TEXT,
        Address TEXT,
        City TEXT,
        State TEXT,
        Country TEXT
    );
    CREATE TABLE IF NOT EXISTS products (
        ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
        ProductName TEXT,
        ProductPrice REAL,
        ProductStock INTEGER,
        ProductDescription TEXT,
        BusinessID INTEGER
    );
`);

console.log("Database Connected!");
updateDatabaseDocumentation();

// DOCUMENTATION
async function updateDatabaseDocumentation() {
    UpdateDocumentation.UpdateDocumentation(Database);
}

// TABLE - accounts

// FUNCTION: createAccount
async function createAccount(name, password) {
    const query = Database.prepare("INSERT INTO accounts (AccountName, AccountPasscode, BusinessName) VALUES (?, ?, 'None')");
    const info = query.run(name, password);
    return info.changes > 0;
}

// FUNCTION: getAccount
async function getAccount(name) {
    console.log("Database.js getAccount() username input: " + name);
    const query = Database.prepare("SELECT * FROM accounts WHERE AccountName = ?");
    const result = query.get(name);
    if (result) {
        console.log(result);
        return result;
    } else {
        return false;
    }
}

// FUNCTION: deleteAccount
async function deleteAccount(name) {
    const query = Database.prepare("DELETE FROM accounts WHERE AccountName = ?");
    const info = query.run(name);
    return info.changes > 0;
}

// TABLE - businesses

// FUNCTION: createBusiness
async function createBusiness(name, Address, City, State, Country) {
    const query = Database.prepare("INSERT INTO businesses (BusinessName, Address, City, State, Country) VALUES (?, ?, ?, ?, ?)");
    const info = query.run(name, Address, City, State, Country);
    return info.changes > 0;
}

// FUNCTION: getBusiness
async function getBusiness(BusinessID_or_Name) {
    let query;
    if (typeof BusinessID_or_Name === 'string') {
        query = Database.prepare("SELECT * FROM businesses WHERE BusinessName = ?");
    } else {
        query = Database.prepare("SELECT * FROM businesses WHERE BusinessID = ?");
    }
    const result = query.get(BusinessID_or_Name);
    if (result) {
        return result;
    } else {
        return false;
    }
}

// FUNCTION: deleteBusiness
async function deleteBusiness(BusinessID) {
    const query = Database.prepare("DELETE FROM businesses WHERE BusinessID = ?");
    const info = query.run(BusinessID);
    return info.changes > 0;
}

// TABLE - products

// FUNCTION: getProducts
async function getProducts(BusinessID, ProductName) {
    let query;
    if (BusinessID > 0) {
        query = Database.prepare("SELECT * FROM products WHERE ProductName LIKE ? AND BusinessID = ?");
        return query.all(`%${ProductName}%`, BusinessID);
    } else if (ProductName !== '') {
        query = Database.prepare("SELECT * FROM products WHERE ProductName LIKE ?");
        return query.all(`%${ProductName}%`);
    } else {
        query = Database.prepare("SELECT * FROM products");
        return query.all();
    }
}

// FUNCTION: addProduct
async function addProduct(ProductName, ProductPrice, ProductStock, ProductDescription) {
    const query = Database.prepare("INSERT INTO products (ProductName, ProductPrice, ProductStock, ProductDescription) VALUES (?, ?, ?, ?)");
    const info = query.run(ProductName, ProductPrice, ProductStock, ProductDescription);
    return info.changes > 0;
}

// FUNCTION: deleteProduct
async function deleteProduct(ProductName) {
    const query = Database.prepare("DELETE FROM products WHERE ProductName = ?");
    const info = query.run(ProductName);
    return info.changes > 0;
}

// EXPORTS
module.exports = { getProducts, addProduct, deleteProduct, createAccount, deleteAccount, getAccount, createBusiness, getBusiness, deleteBusiness };