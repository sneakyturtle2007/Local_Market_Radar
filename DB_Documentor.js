const sqlite3 = require('better-sqlite3');
var fs = require('fs');

async function UpdateDocumentation(Database){
    var documentation = "";
    documentation += "All tables in database - \n";
    
    let results = Database.prepare("SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%';").get();
    
    console.log("Show tables query for documentation: ");
    console.log(results);
    let tables = "Table Descriptions - \n";
    for(var i = 0; i < results.length; i++){
        let tableName = await results[i].name;
        documentation += "    "
        documentation += tableName;
        documentation += "\n";
        tables += tableName + " - \n";
        tables += "    Field | Type | Null | Key | Default | Extra\n\n";
        console.log("table info  - ");
        let tableInfo = GetTableInfo(Database, tableName);
        console.log(tableInfo);
        tables += "    " + results[i].name;
        tables += "\n";
    }
    documentation += "\n\n";
    documentation += tables;
    fs.writeFileSync("DatabaseDocumentation.txt", documentation);
}

async function GetTableInfo(Database, tableName){
    let results = Database.prepare('PRAGMA table_info([?])').get(tableName);

    console.log("Describe query for documentation: ");
    console.log(results);
    return results;
}


module.exports = {UpdateDocumentation};