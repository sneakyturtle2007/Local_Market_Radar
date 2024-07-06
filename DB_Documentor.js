const mysql = require('mysql2');
var fs = require('fs');

async function UpdateDocumentation(con){
    var documentation = "";
    documentation += "All tables in database - \n";
    
    let[results, fields] =  await con.promise().query("SHOW TABLES").catch((err) => {console.log(err);});
    console.log("Show tables query for documentation: ");
    console.log(await results);
    let tables = "Table Descriptions - \n";
    for(var i = 0; i < results.length; i++){
        let tableName = await results[i].Tables_in_main;
        documentation += "    "
        documentation += tableName;
        documentation += "\n";
        tables += tableName + " - \n";
        tables += "    Field | Type | Null | Key | Default | Extra\n\n";
        console.log("table info  - ");
        let tableInfo = await GetTableInfo(con, tableName).catch((err) => {console.log(err);} )
        console.log(tableInfo);
        tables += "    " + tableInfo.map(row => row.Field + "  |" + row.Type + " | " + row.Null + " | " + row.Key + " | " + row.Default + " | " + row.Extra).join("\n    ") + "\n";
        tables += "\n";
    }
    documentation += "\n\n";
    documentation += tables;
    fs.writeFileSync("DatabaseDocumentation.txt", documentation);
}

async function GetTableInfo(con, tableName){
    let[results, fields] =  await con.promise().query("DESCRIBE " + tableName).catch((err) => {console.log(err);});
    console.log("Describe query for documentation: ");
    console.log(await results);
    return await results;
}


module.exports = {UpdateDocumentation};