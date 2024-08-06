const sqlite3 = require('better-sqlite3');
var fs = require('fs');

async function UpdateDocumentation(Database){
    var documentation = "";
    documentation += "All tables in database - \n";
    
    let results = Database.prepare("SHOW TABLES").all();

    console.log("Show tables query for documentation: ");
    console.log(results);
    let tables = "Table Descriptions - \n";
    for(var i = 0; i < results.length; i++){
        let tableName = await results[i].Tables_in_main;
        documentation += "    "
        documentation += tableName;
        documentation += "\n";
        tables += tableName + " - \n";
        tables += "    Field | Type | Null | Key | Default | Extra\n\n";
        console.log("table info  - ");
        let tableInfo = GetTableInfo(Database, tableName);
        console.log(tableInfo);
        tables += "    " + tableInfo.map(row => row.Field + "  |" + row.Type + " | " + row.Null + " | " + row.Key + " | " + row.Default + " | " + row.Extra).join("\n    ") + "\n";
        tables += "\n";
    }
    documentation += "\n\n";
    documentation += tables;
    fs.writeFileSync("DatabaseDocumentation.txt", documentation);
}

async function GetTableInfo(Database, tableName){
    let results = Database.prepare('DESCRIBE ' + tableName).all();

    console.log("Describe query for documentation: ");
    console.log(results);
    return results;
}


module.exports = {UpdateDocumentation};