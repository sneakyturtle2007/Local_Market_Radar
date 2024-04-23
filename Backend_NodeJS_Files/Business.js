class Business{
    constructor(businessName, address, city, state, businessID, zipcode){
        this.businessName = businessName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.businessID = businessID;
        this.zipcode = zipcode;
    }
}

async function getBusiness(username){
    var business = await DB.getBusiness(username);
    return new Business(business[0].BusinessName, business[0].Address, business[0].City, business[0].State, business[0].BusinessID, business[0].Zipcode);
}