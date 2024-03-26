const DB = require('../DataBase.js');

async function signup(username, password){
    var account = await DB.getAccount(username);
    if(account){
        return false;
    }
    await DB.createAccount(username, password);
    return true;
}

module.exports = {signup};