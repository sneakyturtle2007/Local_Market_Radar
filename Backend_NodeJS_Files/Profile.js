const DB = require('../DataBase.js');

class profile{
    constructor(AccountName, AccountPasscode, BusinessName, AccountEmail, AccountAddress, AccountProfilePicture, FavoriteBusinesses){
        this.AccountName = AccountName;
        this.AccountPasscode = AccountPasscode;
        this.BusinessName = BusinessName;
        this.AccountEmail = AccountEmail;
        this.AccountAddress = AccountAddress;
        this.AccountProfilePicture = AccountProfilePicture;
        this.FavoriteBusinesses = FavoriteBusinesses;
    }

}
async function getProfile(username){
    var user = await DB.getAccount(username);
    console.log("debuggings");
    console.log(user);
    console.log(user[0].AccountName);
    return new profile(user[0].AccountName, user[0].AccountPasscode, user[0].BusinessName, user[0].AccountEmail, user[0].AccountAddress, user[0].AccountProfilePicture, user[0].FavoriteBusinesses);
}

module.exports = {getProfile};
