const DB = require('../DataBase.js');

async function getProfile(username){
    var user = await DB.getUser(username);
    return user;
}

module.exports = {getProfile};
