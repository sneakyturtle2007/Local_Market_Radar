const DB = require('../DataBase.js');

async function login(username, password){
    var account = await DB.getAccount(username);
    if(account){
        if(account[0].AccountPasscode == password){
            return true;
        }
    }
    return false;
}

module.exports = {login};