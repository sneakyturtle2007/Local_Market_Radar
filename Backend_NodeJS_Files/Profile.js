const DB = require('../DataBase.js');

class profile{
    constructor(accountName, accountPasscode, businessName, accountEmail, accountAddress, accountProfilePicture, favoriteBusinesses){
        this.accountName = accountName;
        this.accountPasscode = accountPasscode;
        this.businessName = businessName;
        this.accountEmail = accountEmail;
        this.accountAddress = accountAddress;
        this.accountProfilePicture = accountProfilePicture;
        this.favoriteBusinesses = favoriteBusinesses;
    }

}


async function getProfile(username){
    var user = await DB.getAccount(username);
    console.log("Backend Profile File: " + user[0]);
    return new profile(user[0].AccountName, user[0].AccountPasscode, user[0].BusinessName, user[0].AccountEmail, user[0].AccountAddress, user[0].AccountProfilePicture, user[0].FavoriteBusinesses);
}


module.exports = {getProfile};
